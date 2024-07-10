import { useState, useEffect } from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import plane from '/airplane.svg';
import '../App.css';

function App() {
  const [count, setCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cityChoices, setCityChoices] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [winningCity, setWinningCity] = useState('Austin');
  const cities = [
      'Austin',
      'Dallas',
      'New York',
      'LA',
      'Houston',
      'Chicago',
      'Denver',
      'San Antonio',
      'Boston',
      'Helena',
      'Orlando',
      'Seattle'
  ];
cities.push(winningCity);

  useEffect(() => {
    setCityChoices(
      cities
        .map(value => ({ value,
          sort: value === winningCity ?
            Math.floor(Math.random() * 4)
          : Math.floor(Math.random() * cities.length)}))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4)
    );
  }, [])

const handleSubmit = (e) => {
  e.preventDefault();
  setShowResult(!showResult);
  selectedCity === winningCity ? setGameState(true) : setGameState(false);
}

const handleChange = (e) => {
  // setSelectedCity(e.target.value);
}

  return (
    <>
      <h1>Cheapest Flight to
        <h2>San Francisco
        <a href="https://shorturl.at/iPqoJ" target="_blank">
          <img src={plane} className="Plane icon" alt="Plane icon" />
        </a>
        </h2>
      </h1>
      <div>
        {!showResult ? (

          <form onSubmit={handleSubmit}>
            <p>Select city with cheapest flight to SF:</p>
            {cityChoices.map((city, index) => (
              <span key={index}>
                <input type="radio" id={`city${index}`} name="citySelection" value={city} onChange={handleChange} required/>
                <label htmlFor={`city${index}`}>{city}</label>
              </span>
            ))}
            <div>
              <button type="submit">Select</button>
            </div>
          </form>
        ) : (
          <div>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <div>
              {!gameState ?
                'Congrats!' : 'Oh no!'
              }

            </div>
            <button onClick={handleSubmit}>Try Again</button>
          </div>
        )}
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
