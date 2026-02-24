// Implement filter component for characters based on homeworld, film, or species.
const Filter = ({
  speciesList,
  homeworldList,
  filmList,
  filters,
  setFilters,
}) => {
  return (
    <div className="filters">
      <select
        value={filters.species}
        onChange={(e) => setFilters({ ...filters, species: e.target.value })}
      >
        <option value="">Species</option>
        {speciesList.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.homeworld}
        onChange={(e) => setFilters({ ...filters, homeworld: e.target.value })}
      >
        <option value="">Homeworld</option>
        {homeworldList.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      <select
        value={filters.film}
        onChange={(e) => setFilters({ ...filters, film: e.target.value })}
      >
        <option value="">Film</option>
        {filmList.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
