import '../components/App.jsx';
const Suggested = ({ handleSuggestionChange, index, airport, id }) => {
  return (
    <div
      id={id}
      key={index}
      className="suggestion-item"
      onClick={() => handleSuggestionChange(airport)}
    >
      {airport.name} ({airport.code})
    </div>
  );
};

export default Suggested;