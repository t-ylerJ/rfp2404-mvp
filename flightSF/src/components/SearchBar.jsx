import '../components/App.jsx';


function SearchBar( { handleChange, handleSubmit, filterText, initialCity, airportCodeLookup} ) {
const city = airportCodeLookup[initialCity];

  return (
    <>
      <input
        type="text"
        // placeholder={`e.g. ${airportCodeLookup[initialCity]}, ${initialCity}`}
        placeholder={`e.g. "${city}" or "${initialCity}"`}
        value={filterText}
        className="text-input"
        onChange={handleChange}
      />
    </>
  );
}

export default SearchBar;