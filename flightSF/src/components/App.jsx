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
  const [cityNames, setCityNames] = useState([]);

  const [gameState, setGameState] = useState(false);
  const [winningCity, setWinningCity] = useState('Austin');
  const [flights, setFlights] = useState([]);
  const [searchIteneraries, setSearchIteneraries] = useState([]);
  const [searchPrices, setSearchPrices] = useState([]);
  const [searchReturn, setSearchReturn] = useState([])

  const cities = [

  {
    'name': 'Dallas',
    'code': 'DFW',
    'price': 2
  },

  {
    'name': 'Los Angeles',
    'code': 'LAS',
    'price': 5
  },

  {
    'name': 'ORD',
    'code': 'Chicago',
    'price': 6
  },

  {
    'name': 'Austin',
    'code': 'AUS',
    'price': 3
  },

  {
    'name': 'Denver',
    'code': 'DEN',
    'price': 4
  },
  {
    'name': 'Atlanta',
    'code': 'ATL',
    'price': 3
  },
  {
    'name': 'Seattle',
    'code': 'SEA',
    'price': 5
  },

]


// useEffect(() => {
// }, [])


useEffect(() => {
  // setWinningCity(findSmallest(obj));
  setCityChoices(
    cities
    .map(value => ({ value,
      sort: Math.floor(Math.random() * cities.length)}))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 4)
    );
  }, [showResult])


  const handleSubmit = (e) => {

  const smallest = cityChoices.sort((a, b) => a.price - b.price)


    e.preventDefault();
    setShowResult(!showResult);
    setWinningCity((smallest[0].name)
    );
    selectedCity === winningCity ? setGameState(true) : setGameState(false);
    setCityNames(cityChoices.map(city => (city.name)))
}

const handleChange = (e) => {
  setSelectedCity(e.target.value);
}

const getFlights = async function(location) {
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
    "sources": [
      "GDS"
    ]
  }

 try {

   const response = await axios.post('https://test.api.amadeus.com/v2/shopping/flight-offers', flightSearch,{ headers: {
     "Authorization": "Bearer tldzzweGoWP5GNXUM911ScHuXLTC",
     "Content-Type": "application/json"
    }});
    // setSearchReturn(response.data.data.iteneraries.map((itenerary) => itenerary.segments.map((segment) => segment.departurn.iataCode)))

//     setSearchIteneraries(response.data.data.map((flight) => (
//       // { 'itenerary': itenerary, 'price': price }
//       { 'id': flight.id, 'itenerary': flight.itineraries, 'price': flight.price.total }
//     ))
// );
    setSearchIteneraries(response.data.data.map((flight) => (
      { 'id': flight.id, 'itenerary': flight.itineraries, 'price': flight.price.total }
      ))
    );
    const departing = searchIteneraries.map((itenerary)=> (
      itenerary.itenerary.map((segment) => (
        segment.segments.map((seg) => (
          seg.departure.iataCode
        )))
      )));
    setSearchReturn(departing)


  } catch(err) {
    console.error('Error fetching flight data:', err)
  }
}


useEffect(() => {
getFlights('LAX')
}, []);
console.log(searchReturn);
console.log(searchIteneraries);


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
                <input type="radio" id={`city${index}`} name="citySelection" value={city.name} onChange={handleChange} required/>
                <label htmlFor={`city${index}`}>{city.name}</label>
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
