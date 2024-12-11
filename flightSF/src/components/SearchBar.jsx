import '../components/App.jsx';


function SearchBar( { handleChange, handleSubmit, filterText, initialCity, airportCodeLookup} ) {
const city = airportCodeLookup[initialCity];

  return (
    <>
      <input
        type="text"
        placeholder={`e.g. "Baltimore" or "BWI"`}
        value={filterText}
        className="text-input"
        onChange={handleChange}
      />
    </>
  );
}

export default SearchBar;