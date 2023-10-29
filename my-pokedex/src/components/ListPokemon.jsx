import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  TipoPokemonBackground from '../components/TipoPokemonBackground'
import '../config/colors.css';
import './ListPokemon.css';

function ListaPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const carregarPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`); 
        const data = response.data.results;

        const shuffledPokemons = shuffleArray(data);

        const newPokemons = await Promise.all(
          shuffledPokemons.slice(offset, offset + 3).map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );

        setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
      }
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    carregarPokemon();
  }, [offset]);

  const handleCarregarMais = () => {
    setOffset(offset + 6);
  };

  return (
    <div>
      <h1 className='nomeCard'>Lista de Pokémon</h1>
      <div className='listaCard'>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`pokemon-card ${pokemon.types[0].type.name}`}
          >
              <TipoPokemonBackground tipo={pokemon.types[0].type.name}  className='TipoPokemonBackground'/>

            <div className='pokemon-info'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className='pokemon-imagem' />
              <div className='info'>
                <p className='nome'>{pokemon.name}</p>
                <p className='tipo'>{pokemon.types.map((type) => type.type.name).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCarregarMais}>Carregar Mais</button>
    </div>
  );
}

export default ListaPokemon;
