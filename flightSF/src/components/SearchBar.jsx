import '../components/App.jsx';


function SearchBar( { handleChange, handleSubmit, filterText, initialCity} ) {

  return (
    <>
      <input
        type="text"
        placeholder={initialCity}
        // value={filterText}
        onChange={handleChange}
      />
    </>
  );
}

export default SearchBar;