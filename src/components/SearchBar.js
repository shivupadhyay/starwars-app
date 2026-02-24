const SearchBar = ({ value, onChange }) => {
  return (
    <input
      placeholder="Search by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
