import PropTypes from 'prop-types';
import bugIcon from '../assets/Icons/bug.svg';
import darkIcon from '../assets/Icons/dark.svg';
import dragonIcon from '../assets/Icons/dragon.svg';
import electricIcon from '../assets/Icons/electric.svg';
import fairyIcon from '../assets/Icons/fairy.svg';
import fightingIcon from '../assets/Icons/fighting.svg';
import fireIcon from '../assets/Icons/fire.svg';
import flyingIcon from '../assets/Icons/flying.svg';
import ghostIcon from '../assets/Icons/ghost.svg';
import grassIcon from '../assets/Icons/grass.svg';
import groundIcon from '../assets/Icons/ground.svg';
import iceIcon from '../assets/Icons/ice.svg';
import normalIcon from '../assets/Icons/normal.svg';
import poisonIcon from '../assets/Icons/poison.svg';
import psychicIcon from '../assets/Icons/psychic.svg';
import rockIcon from '../assets/Icons/rock.svg';
import steelIcon from '../assets/Icons/steel.svg';
import waterIcon from '../assets/Icons/water.svg';


function TipoPokemon({ tipo }) {

  const icones = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    water: waterIcon,
  };
  console.log(`${icones[tipo]}`)
  
  return (
    <div className="tipo">
      <img
        src={`${icones[tipo]}`} 
        alt={`Ícone do tipo ${tipo}`}
      />
      <p>{tipo}</p>
    </div>
  );
  
  }
TipoPokemon.propTypes = {
  tipo: PropTypes.string.isRequired,
};

export default TipoPokemon;
