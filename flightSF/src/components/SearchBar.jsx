import '../components/App.jsx';


function SearchBar( { handleChange, handleSubmit, filterText, initialCity, airportCodeLookup} ) {
const city = airportCodeLookup[initialCity];

  return (
    <>
      <input
        type="text"
        placeholder={`e.g. "Los Angeles" or "LAX"`}
        value={filterText}
        className="text-input"
        onChange={handleChange}
      />
    </>
  );
}

export default SearchBar;