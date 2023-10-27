import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [selecionado, setSelecionado] = useState(-1); // Inicialmente, nada selecionado

  const realizarPesquisa = async (termo) => {
    try {
      setTermoPesquisa(termo);
      setSelecionado(-1); // Reinicia a seleção

      if (!termo) {
        setSugestoes([]);
      } else {
        if (isNaN(termo)) {
          // Se o termo não for um número, pesquisa por nome
          const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;
          const resposta = await axios.get(url);
          const pokemons = resposta.data.results;

          const sugestoesFiltradas = pokemons
            .filter((pokemon) => pokemon.name.includes(termo.toLowerCase()))
            .map((pokemon) => {
              const idPokemon = pokemon.url.split('/').slice(-2, -1);
              return `${idPokemon} - ${pokemon.name}`;
            });

          setSugestoes(sugestoesFiltradas);
        } else {
          // Se o termo for um número, pesquisa por ID
          const url = `https://pokeapi.co/api/v2/pokemon/${termo}`;
          const resposta = await axios.get(url);
          const idPokemon = resposta.data.id;
          const nomePokemon = resposta.data.name;
          setSugestoes([`${idPokemon} - ${nomePokemon}`]);
        }
      }
    } catch (erro) {
      console.log('Erro ao obter sugestões de Pokémon:', erro);
      setSugestoes([]);
    }
  }

  const selecionarSugestao = (sugestao) => {
    const idPokemon = sugestao.split(' - ')[0];
    setTermoPesquisa(idPokemon);
    setSugestoes([]);
    onSearch(idPokemon);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && selecionado >= 0) {
      selecionarSugestao(sugestoes[selecionado]);
    } else if (e.key === 'ArrowDown') {
      // Navegar para baixo na lista de sugestões
      e.preventDefault();
      if (selecionado < sugestoes.length - 1) {
        setSelecionado(selecionado + 1);
      }
    } else if (e.key === 'ArrowUp') {
      // Navegar para cima na lista de sugestões
      e.preventDefault();
      if (selecionado > -1) {
        setSelecionado(selecionado - 1);
      }
    }
  }

  return (
    <div className="barra-de-pesquisa">
      <input
        type="text"
        placeholder="Pesquisar Nome ou ID do Pokemon"
        value={termoPesquisa}
        onChange={(e) => {
          const novoTermo = e.target.value;
          realizarPesquisa(novoTermo);
          setSelecionado(-1); // Reinicia a seleção ao digitar
        }}
        onKeyDown={handleKeyDown} // Adiciona a detecção de teclas pressionadas
      />
      {sugestoes.length > 0 && (
        <select
          id="select-sugestoes"
          size="5"
          className="sugestoes-dropdown"
          value={selecionado}
          onChange={(e) => selecionarSugestao(sugestoes[e.target.value])}
        >
          <option value="">Selecione...</option>
          {sugestoes.map((sugestao, index) => (
            <option key={sugestao} value={index}>
              {sugestao}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default SearchBar;
