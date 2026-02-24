// Apply a specific background color to each card based on the character's species.

export const getSpeciesColor = (species) => {
  const map = {
    Human: "yellow",
    Droid: "lightblue",
    Wookiee: "lightgrey",
  };
  return map[species] || "#e1bee7";
};
