import "./styles/model.css";
import { formatDate } from "../utils/formatDate";


const CharacterModal = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{character.name}</h2>
        <p>Height: {character.height / 100} m</p>
        <p>Mass: {character.mass} kg</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Date Added: {formatDate(character.created)}</p>
        <p>Films: {character.films.length}</p>

        <h3>Homeworld</h3>
        <p>Name: {character.homeworldData?.name}</p>
        <p>Terrain: {character.homeworldData?.terrain}</p>
        <p>Climate: {character.homeworldData?.climate}</p>
        <p>Population: {character.homeworldData?.population}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CharacterModal;
