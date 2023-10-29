
function TipoPokemonBackground({ tipo }) {
  const tipoToSvg = {
    bug: 'bug.svg',
    dark: 'dark.svg',
    dragon: 'dragon.svg',
    electric: 'electric.svg',
    fairy: 'fairy.svg',
    fighting: 'fighting.svg',
    fire: 'fire.svg',
    flying: 'flying.svg',
    ghost: 'ghost.svg',
    grass: 'grass.svg',
    ground: 'ground.svg',
    ice: 'ice.svg',
    normal: 'normal.svg',
    poison: 'poison.svg',
    psychic: 'psychic.svg',
    rock: 'rock.svg',
    steel: 'steel.svg',
    water: 'water.svg',
  };

  const svgURL = tipoToSvg[tipo] ? `src/assets/icons/${tipoToSvg[tipo]}` : '';

  return (
    <div className='tipo-background'>
      <img
        src={svgURL}
        alt={`Tipo ${tipo}`}
        className='tipo-image'
        style={{ width: '40px', height: '140px' }} 
      />
    </div>
  );
}

export default TipoPokemonBackground;
