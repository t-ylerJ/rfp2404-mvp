import { useState, useEffect } from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import plane from '/airplane.svg';
import axios from 'axios';
import '../App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cityChoices, setCityChoices] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [winningCity, setWinningCity] = useState('Austin');
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState('');
  const [searchReturn, setSearchReturn] = useState([])
  const cities = [
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

  useEffect(() => {
    cities.push(winningCity);
    setCityChoices(
      cities
        .map(value => ({ value,
          sort: value === winningCity ?
            Math.floor(Math.random() * 3)
          : Math.floor(Math.random() * cities.length)}))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4)
    );
  }, [showResult])

const handleSubmit = (e) => {
  e.preventDefault();
  setShowResult(!showResult);
  selectedCity === winningCity ? setGameState(true) : setGameState(false);
}

const handleChange = (e) => {
  setSelectedCity(e.target.value);
}

const getFlights = async () => {
 try {
  const response = await axios.get('/flight-search', {
    params: {
      originCode: 'LAX',
      destinationCode: 'SFO',
      dateOfDeparture: '2024-10-01',
      Adults: '1'
    }
  })

  setSearchReturn(response.data)
} catch(err) {
  console.error('Error fetching city/airport data:', err)
}
}
useEffect(() => {
getFlights()
}, [])
console.log(searchReturn)


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
            <div className="text-gray-600 pt-10">
            </div>
              <button type="submit">Select</button>
          </form>
        ) : (
          <div>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>

            <div>
              {gameState ?
                'Congrats!' : 'Oh no!'
              }

            </div>
            <button onClick={handleSubmit}>Try Again</button>
          </div>
        )}
      </div>
      <div className="card">

      </div>
      <p className="read-the-docs">

      </p>
    </>
  )
}

export default App
