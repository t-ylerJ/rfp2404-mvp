import { useState, useEffect } from 'react';
import reactLogo from '/react.svg';
import goldenGateBridge from '/golden-gate-bridge.svg';
import plane from '/airplane.svg';
import axios from 'axios';
import '../App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cityChoices, setCityChoices] = useState([]);
  const [gameState, setGameState] = useState(false);





  const [cities, setCities] = useState([
    { 'name': 'Dallas', 'code': 'DFW', 'price': 0 },
    { 'name': 'Las Vegas', 'code': 'LAS', 'price': 0 },
    { 'name': 'Chicago', 'code': 'ORD', 'price': 0 },
    { 'name': 'Austin', 'code': 'AUS', 'price': 0 },
    { 'name': 'Denver', 'code': 'DEN', 'price': 0 },
    { 'name': 'Atlanta', 'code': 'ATL', 'price': 0 },
    { 'name': 'Seattle', 'code': 'SEA', 'price': 0 },
  ])



  const getFlights = async function (location) {
    var flightSearch = {
      "currencyCode": "USD",
      "originDestinations": [
        {
          "id": "1",
          "originLocationCode": location,
          "destinationLocationCode": "SFO",
          "departureDateTimeRange": {
            "date": "2024-11-01"
          }
        }
      ],
      "travelers": [
        {
          "id": "1",
          "travelerType": "ADULT"
        }
      ],
      "searchCriteria": {
        "maxFlightOffers": 2
      },
      "sources": [
        "GDS"
      ]
    }

    const response = axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', flightSearch, {
      headers: {
        "Authorization": "Bearer pyp4ZnJqd9SLI9uCE6Ra12oEsMaj",
        "Content-Type": "application/json"
      }
    })

    return response;
  };

  const fetchCityPrices = async () => {
    const cityPromises = cities.map((city) => {

      return getFlights(city.code)
    });
    const updatedCities = await Promise.all(cityPromises);
    setCities(updatedCities);

  }

  useEffect(() => {
    fetchCityPrices()
  }, [])

  useEffect(() => {

    setCityChoices(
      cities
        .map(value => ({ value, sort: Math.floor(Math.random() * cities.length) }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4)
    );
  }, [showResult]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const smallest = cityChoices.sort((a, b) => a.price - b.price);

    setShowResult(!showResult);
    setGameState(selectedCity === smallest[0].name)
  }

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  }




  return (
    <>
      <h1>Cheapest Flight to
        <h2>San Francisco
          <a href="https://www.sftravel.com/" target="_blank">
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
                <input type="radio" id={`city${index}`} name="citySelection" value={city.name} onChange={handleChange} required />
                <label htmlFor={`city${index}`}>{city.name}</label>
              </span>
            ))}
            <div className="text-gray-600 pt-10">
            </div>
            <button type="submit">Select</button>
          </form>
        ) : (
          <div>
            <img src={goldenGateBridge} className="logo bridge" alt="golden-gate-bridge" />
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

export default App;



