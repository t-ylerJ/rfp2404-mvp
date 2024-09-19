import '../components/App.jsx';
const Suggested = ({ handleSuggestionChange, index, airport }) => {
  return (
    <div
      key={index}
      className="suggestion-item"
      onClick={() => handleSuggestionChange(airport)}  // Update selected airport on click
    >
      {airport.name} ({airport.code})
    </div>
  );
};

export default Suggested;