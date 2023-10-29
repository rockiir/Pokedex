import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard'; // Certifique-se de importar o componente PokemonCard aqui
import interrogationImage from '../assets/interrogation.png';
import ListPokemon from '../components/ListPokemon';
import './Home.css'

function Home() {
  const [dadosPokemon, setDadosPokemon] = useState({
    especie: '...',
    tipo: '...',
    altura: '...',
    peso: '...',
    evolucao: '...',
    biologia: '...',
    nome: '...',
  });

  const [imagemPokemon, setImagemPokemon] = useState(interrogationImage);
  const [imagemPokemonRodape, setImagemPokemonRodape] = useState(interrogationImage);
  const [nomePokemon, setNomePokemon] = useState('Nome do Pokemon');
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [dadosCarregadosRodape, setDadosCarregadosRodape] = useState(false);

  const obterDadosPokemon = async (termoPesquisa) => {
    const resultadoPesquisa = await obterPokemon(termoPesquisa);

    if (resultadoPesquisa) {
      const {
        especie,
        tipo,
        altura,
        peso,
        evolucao,
        biologia,
        imagem,
        imagemRodape,
      } = resultadoPesquisa;

      setDadosPokemon({
        especie: especie,
        tipo: tipo,
        altura: altura,
        peso: peso,
        evolucao: evolucao,
        biologia: biologia,
      });

      setImagemPokemon(imagem);
      setDadosCarregados(true);
      setDadosCarregadosRodape(true);
      setImagemPokemonRodape(imagemRodape);
    } else {
      console.log('Pokemon não encontrado');
      setDadosCarregados(true);
      setDadosCarregadosRodape(true);
    }
  }

  return (
    <div className="home">
      <PokemonCard
        nome={nomePokemon}
        tipo={dadosPokemon.tipo}
        especie={dadosPokemon.especie}
        altura={dadosPokemon.altura}
        peso={dadosPokemon.peso}
        evolucao={dadosPokemon.evolucao}
        biologia={dadosPokemon.biologia}
        imagem={imagemPokemon}
        imagemRodape={imagemPokemonRodape}
        dadosCarregados={dadosCarregados}
        dadosCarregadosRodape={dadosCarregadosRodape}
        interrogationImage={interrogationImage}
      />
      <ListPokemon />
    </div>
  );
}

export default Home;
