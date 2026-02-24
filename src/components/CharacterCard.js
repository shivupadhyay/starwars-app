import "./styles/card.css";
import { getSpeciesColor } from "../utils/speciesColor";

const CharacterCard = ({ character, onClick }) => (
  <div
    className="card"
    style={{ backgroundColor: getSpeciesColor(character.speciesName) }}
    onClick={() => onClick(character)}
  >
    <img
      src={`https://picsum.photos/200?random=${character.name}`}
      alt={character.name}
    />
    <h3>{character.name}</h3>
  </div>
);

export default CharacterCard;
