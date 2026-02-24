import { render, screen } from "@testing-library/react";
import CharacterModal from "./components/CharacterModal";

test("modal opens with correct character info", () => {
  const character = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    birth_year: "19BBY",
    created: "2014-12-09T13:50:51.644000Z",
    films: ["1", "2"],
    homeworldData: {
      name: "Tatooine",
      terrain: "desert",
      climate: "arid",
      population: "200000",
    },
  };

  render(<CharacterModal character={character} onClose={() => {}} />);

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
});
