import '../components/App.jsx';


function SearchBar( { handleChange, handleSubmit, filterText, initialCity} ) {

  return (
    <>
      <input
        type="text"
        placeholder={initialCity}
        onChange={handleChange}
      ></input>
    </>
  )
}

export default SearchBar;