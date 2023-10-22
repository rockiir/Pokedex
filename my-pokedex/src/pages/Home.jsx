import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import interrogationImage from '../assets/interrogation.png';


function Home() {
  const [dadosPokemon, setDadosPokemon] = useState({
    especie: '...',
    tipo: '...',
    altura: '...',
    peso: '...',
    evolucao: '...',
    biologia: '...',
    nome: '...'
  });

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [imagemPokemon, setImagemPokemon] = useState(interrogationImage);
  const [imagemPokemonRodape, setImagemPokemonRodape] = useState(interrogationImage);
  const [nomePokemon, setNomePokemon] = useState('Nome do Pokemon');
  const [sugestoes, setSugestoes] = useState([]);
  const [selecionado, setSelecionado] = useState('');




  useEffect(() => {
    if (termoPesquisa) {
      obterDadosPokemon(termoPesquisa);
    }
  }, [termoPesquisa]);

  const obterSugestoes = async (termo) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;
    try {
      const resposta = await axios.get(url);
      const pokemons = resposta.data.results.map((pokemon) => pokemon.name);
      const sugestoesFiltradas = pokemons.filter((pokemon) =>
        pokemon.includes(termo)
      );
      setSugestoes(sugestoesFiltradas);
    } catch (erro) {
      console.log('Erro ao obter sugestões de Pokémon:', erro);
    }
  };
  const selecionarSugestao = (sugestao) => {
    setTermoPesquisa(sugestao);
    setSugestoes([]);
  };

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
        nome
      } = resultadoPesquisa;

      setDadosPokemon({
        especie: especie,
        tipo: tipo,
        altura: altura,
        peso: peso,
        evolucao: evolucao,
        biologia: biologia
      });

      setImagemPokemon(imagem);
      setDadosCarregados(true);
      setDadosCarregadosRodape(true);
      setImagemPokemonRodape(imagemRodape);
    } else {
      console.log('Pokemon nao encontrado');
      setDadosCarregados(true);
      setDadosCarregadosRodape(true);


    }
  };

  const obterPokemon = async (termoPesquisa) => {
    const informacoesGerais = await obterInformacoesGerais(termoPesquisa);

    if (!informacoesGerais) {
      return null;
    }

    const informacoesEspecie = await obterInformacoesEspecie(
      informacoesGerais.species.url
    );
    const informacoesEvolucao = await obterInformacoesEvolucao(
      informacoesEspecie.evolution_chain?.url,
      informacoesGerais.name
    );

    const spriteURL = informacoesGerais.sprites.other.dream_world.front_default || informacoesGerais.sprites.other.official - artwork.front_default;
    const spriteRodapeURL = informacoesGerais.sprites.versions["generation-v"]["black-white"].animated.front_default;


    const pokemon = {
      especie: obterEspecie(informacoesEspecie.genera),
      tipo: obterTipo(informacoesGerais.types),
      altura: obterAltura(informacoesGerais.height),
      peso: obterPeso(informacoesGerais.weight),
      evolucao: obterEvolucao(informacoesEvolucao),
      biologia: obterBiologia(informacoesEspecie.flavor_text_entries),
      imagem: spriteURL,
      imagemRodape: spriteRodapeURL,
      nome: obterNomePokemon(informacoesEspecie.name)
    };

    return pokemon;
  };

  const obterInformacoesGerais = async (termoPesquisa) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${termoPesquisa}`;

    try {
      const resposta = await axios.get(url);
      console.log('Dados do Pokemon:', resposta.data);
      return resposta.data;
    } catch (erro) {
      return null;
    }
  };

  const obterInformacoesEspecie = async (url) => {
    const resposta = await axios.get(url);
    return resposta.data;
  };

  const obterInformacoesEvolucao = async (url, nome) => {
    if (!url) {
      return {
        species: { name: nome },
        evolves_to: []
      };
    }
    const resposta = await axios.get(url);
    return resposta.data.chain;
  };

  const obterEspecie = (array) => {
    return array.find((texto) => texto.language.name === 'en')?.genus || 'Especie Desconhecida';
  };

  const obterTipo = (array) => {
    const tipo = array
      .map((tipoAtual) => capitalizarPrimeiraLetra(tipoAtual.type.name))
      .join(' / ');
    return tipo || 'Tipo Desconhecido';
  };

  const obterAltura = (altura) => {
    return `${altura / 10} m` || 'Altura Desconhecida';
  };

  const obterPeso = (peso) => {
    return `${peso / 10} kg` || 'Peso Desconhecido';
  };

  const obterBiologia = (array) => {
    const listaBiologia = array.filter((texto) => texto.language.name === 'en');
    const biologia = listaBiologia[listaBiologia.length - 1]?.flavor_text || 'Biologia Desconhecida';
    return biologia;
  };
  const obterNomePokemon = async (termoPesquisa) => {
    const informacoesGerais = await obterInformacoesGerais(termoPesquisa);

    if (informacoesGerais) {
      const url = informacoesGerais.species.url;

      try {
        const resposta = await axios.get(url);
        const nome = resposta.data.name;
        const nomeCapitalizado = capitalizarPrimeiraLetra(nome);
        setNomePokemon(nomeCapitalizado);
      } catch (erro) {
        setNomePokemon('Nome do Pokémon'); 
      }
    } else {
      setNomePokemon('Nome do Pokémon'); 
    }
  };

  const obterEvolucao = (obj) => {
    const cadeia = obj;
    const evolucao_1 = capitalizarPrimeiraLetra(cadeia.species.name);
    const evolucao_2 = [];
    const evolucao_3 = [];

    cadeia.evolves_to.forEach((cadeia_2) => {
      evolucao_2.push(capitalizarPrimeiraLetra(cadeia_2.species.name));

      cadeia_2.evolves_to.forEach((cadeia_3) => {
        evolucao_3.push(capitalizarPrimeiraLetra(cadeia_3.species.name));
      });
    });

    if (evolucao_2.length === 0) {
      return `${evolucao_1}`;
    } else if (evolucao_3.length === 0) {
      return `${evolucao_1} > ${evolucao_2.join(', ')}`;
    }

    return `${evolucao_1} > ${evolucao_2.join(', ')} > ${evolucao_3.join(', ')}`;
  };

  const capitalizarPrimeiraLetra = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [dadosCarregadosRodape, setDadosCarregadosRodape] = useState(false);

  return (
    <div className="home">
      <h1>Pesquise o pokemon</h1>
      <div className="barra-de-pesquisa">
        <input
          type="text"
          placeholder="Pesquisar Nome ou ID do Pokemon"
          value={termoPesquisa}
          onChange={(e) => {
            setTermoPesquisa(e.target.value);
            obterSugestoes(e.target.value);
            setSelecionado('');
          }}
        />
        {sugestoes.length > 0 && (
          <select id="select-sugestoes"
            size="5"
            className="sugestoes-dropdown"
            value={selecionado}
            onChange={(e) => selecionarSugestao(e.target.value)}
          >
            <option value="">Selecione...</option>

            {sugestoes.map((sugestao) => (
              <option key={sugestao} value={sugestao}>
                {sugestao}
              </option>
            ))}
          </select>
        )}
      </div >
      <div className="plano-de-fundo-cor">
        <div className="card">
          <svg className="circulo-svg" width="500" height="350">
            <circle cx="250" cy="50" r="270" fill="var(--ice-color)" />
          </svg>
          <div className="imagem-pokemon">
            {dadosCarregados ? (
              <img src={imagemPokemon} alt="Imagem do Pokemon" />
            ) : (
              <img src={interrogationImage} alt="Carregando..." />
            )}
          </div>
          <div className="informacoes-do-pokemon">
            <h1 className='nome'>{nomePokemon}</h1>
            <div className='tipo'>
              <p >{dadosPokemon.tipo}</p>
            </div>
            <div>
              <h2>ESPECIE:</h2>
              <p>{dadosPokemon.especie}</p>
            </div>
            <div>
              <h2>ALTURA:</h2>
              <p>{dadosPokemon.altura}</p>
            </div>
            <div>
              <h2>PESO:</h2>
              <p>{dadosPokemon.peso}</p>
            </div>
            <div>
              <h2>CADEIA DE EVOLUCAO:</h2>
              <p>{dadosPokemon.evolucao}</p>
            </div>
            <div>
              <h2>BIOLOGIA:</h2>
              <p>{dadosPokemon.biologia}</p>
            </div>
            <div className="imagem-pokemon-rodape">
  {dadosCarregadosRodape ? (
    <img src={imagemPokemonRodape} alt="Imagem do Pokemon card inferior" />
  ) : (
    <img src={interrogationImage} alt="Carregando..." />
  )}
            </div>
          </div>
        </div>
      </div>    </div>
  );
}

export default Home;
