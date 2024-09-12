import { useState, useEffect, useId } from 'react';
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
  const [flightDetails, setFlightDetails] = useState([]);
  const [initialCity, setInitialCity] = useState(true);




//Amadeus API authentication tokens only last for 30 mins at a time, so I have added dummy data for ease of use
  const [cities, setCities] = useState([
    { 'name': 'Dallas', 'code': 'DFW', 'price': 250 },
    { 'name': 'Chicago', 'code': 'ORD', 'price': 150 },
    { 'name': 'Austin', 'code': 'AUS', 'price': 239 },
    { 'name': 'Denver', 'code': 'DEN', 'price': 109 },
    { 'name': 'Atlanta', 'code': 'ATL', 'price': 300 },
    { 'name': 'Seattle', 'code': 'SEA', 'price': 125 },
    { 'name': 'Orlando', 'code': 'MCO', 'price': 380 },
    { 'name': 'Miami', 'code': 'MIA', 'price': 390 },
    { 'name': 'Phoenix', 'code': 'PHX', 'price': 210 },
    { 'name': 'Houston', 'code': 'IAH', 'price': 340 },
    { 'name': 'Charlotte', 'code': 'CLT', 'price': 370 },
    { 'name': 'Newark', 'code': 'EWR', 'price': 380 },
    { 'name': 'Minneapolis', 'code': 'MSP', 'price': 310 },
    { 'name': 'Detroit', 'code': 'DTW', 'price': 330 },
    { 'name': 'Philadelphia', 'code': 'PHL', 'price': 370 },
    { 'name': 'Boston', 'code': 'BOS', 'price': 360 },
    { 'name': 'Salt Lake City', 'code': 'SLC', 'price': 190 },
    { 'name': 'Washington D.C.', 'code': 'DCA', 'price': 350 },
    { 'name': 'Baltimore', 'code': 'BWI', 'price': 340 },
    { 'name': 'Fort Lauderdale', 'code': 'FLL', 'price': 370 },
    { 'name': 'Tampa', 'code': 'TPA', 'price': 360 },
    { 'name': 'Portland', 'code': 'PDX', 'price': 250 },
    { 'name': 'San Antonio', 'code': 'SAT', 'price': 330 },
    { 'name': 'St. Louis', 'code': 'STL', 'price': 300 },
    { 'name': 'Cleveland', 'code': 'CLE', 'price': 310 },
    { 'name': 'Kansas City', 'code': 'MCI', 'price': 320 },
    { 'name': 'Indianapolis', 'code': 'IND', 'price': 310 }
  ])

  const getPrice = (selectedCity, week) => {
    //placeholder price generator. priceMap creates an object literal of city: flightprice and gives each price a bigger multiplier based on how close the flight is
    const multiplier = {
      //4 weeks ago = no multiplier
      4: 1,
      3: 1.2,
      2: 1.5,
      1: 1.75
    }
      const priceMap = cities.reduce((acc, city) => {
        // {DFW: 250, ORD: 150, AUS: 239...}
        acc[city.name] = Math.trunc(Math.random() * ((city.price * multiplier[week]) - city.price) + city.price);
        return acc;
      }, {});

      return priceMap[selectedCity];
    }

    const priceTrend = (price1, price2) => {
      let arrow;
      if (price1 === price2) {
        arrow = '=';
      } else if (price1 < price2) {
        arrow = '^';
      } else {
        arrow = 'v'
      }
      return arrow;
    }
    const week4Price = getPrice(selectedCity,4);
    const week3Price = getPrice(selectedCity,3);
    const week2Price = getPrice(selectedCity, 2);
    const week1Price = getPrice(selectedCity, 1);
  const getFlights = async function (location) {
    var params = {
      currencyCode: "USD",
      originLocationCode: location,
      destinationLocationCode: "SFO",
      departureDate: "2024-11-01",
      adults: 1
    }

    const ticketSearch = (obj, target) =>
      target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc;
            if (typeof val === 'object') return ticketSearch(val, target);
          }, undefined);

    // const response = axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    //   params: params,
    //   headers: {
//  "Authorization": `"Bearer ${process.env.ACCESS_TOKEN}"`,
//       "Content-Type": "application/json"
    //   }
    // })
    // const trips = response.data;

    const ticketPrice = ticketSearch(trips, 'total')
    // setCities(
    //   cities.map((city) => (
    //     city.price = ticketPrice()
    //   )))

    // return response;
  };

  const fetchCityPrices = async () => {
    const cityPromises = cities.map((city) => {

      return getFlights(city.code)
    });
    const updatedCities = await Promise.all(cityPromises);
    setCities(updatedCities);
  }



  useEffect(() => {
    setInitialCity(true);
  }, []);
  useEffect(() => {
    setCityChoices(
      cities
      .map(value => ({ value, sort: Math.floor(Math.random() * cities.length) }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 4)
    );
    if (initialCity === true && cityChoices[0]) {
      setSelectedCity(cityChoices[0].name);
      console.log("initial city:", initialCity)
      console.log("selectedCity:", selectedCity, cityChoices[0]);
    }
  }, [showResult]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const smallest = [...cityChoices].sort((a, b) => a.price - b.price)

    setShowResult(!showResult);
    setGameState(selectedCity === smallest[0].name);
    // setInitialCity(true);
    console.log("initialCity:", initialCity)
    // console.log(cities.sort((a, b) => a.price - b.price))
  }

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
    setInitialCity(false);
    console.log("initialCity", initialCity)
    console.log("selectedCity:", selectedCity)
  }
  const cityId = useId();

  var fourWeeksOut = new Date();
  var threeWeeksOut = new Date();
  var twoWeeksOut = new Date();
  var oneWeekOut = new Date ();
  fourWeeksOut.setDate(fourWeeksOut.getDate() - 28);
  threeWeeksOut.setDate(threeWeeksOut.getDate() - 21);
  twoWeeksOut.setDate(twoWeeksOut.getDate() - 14);
  oneWeekOut.setDate(oneWeekOut.getDate() - 7);

  const options = { year: 'numeric', month: 'short', day: 'numeric'};


console.log(selectedCity)

  return (
    <>
      <p id="firstLine">Cheapest Flight to </p>
        <h1>San Francisco
          <a href="https://www.sftravel.com/" target="_blank">
            <img src={plane} className="Plane icon" alt="Plane icon" />
          </a>
        </h1>

      <div className="w-full">
        {!showResult ? (

          <form onSubmit={handleSubmit}>
          <label htmlFor={cityId}>
            Select departing city:
          </label>
            <select

              onChange={handleChange}
              id={cityId} name="citySelection">
              {cityChoices.map((city, index) => (
                <option value={city.name} key={index}>{city.name}</option>

              ))}
          </select>
            <div className="text-gray-600 pt-10">
            </div>
            <button type="submit">Select</button>
          </form>
        ) : (
          <div className="w-full justify-between">
            <div id="timeContainer" style={{ display: 'flex', flexDirection: 'row', gap: '6rem' }}>
              <span className="w-1/4">
                <h2>4 Weeks Ago</h2>
                <p>{fourWeeksOut.toLocaleDateString('en-US', options)}</p>
                <p>${week4Price}</p>
              </span>

              <span className=" w-1/4">
                <h2>3 Weeks Ago</h2>
                <p>{threeWeeksOut.toLocaleDateString('en-US', options)}</p>
                <p>${week3Price}</p>
                <p className="trend">{priceTrend(week4Price,week3Price)}</p>
              </span>

              <span className="flex flex-col w-1/4">
                <h2>2 Weeks Ago</h2>
                <p>{twoWeeksOut.toLocaleDateString('en-US', options)}</p>
                <p>${week2Price}</p>
                <p className="trend">{priceTrend(week3Price,week2Price)}</p>
              </span>

              <span className="flex flex-col w-1/4">
                <h2>1 Week Ago</h2>
                <p>{oneWeekOut.toLocaleDateString('en-US', options)}</p>
                <p>${week1Price}</p>
                <p className="trend">{priceTrend(week2Price,week1Price)}</p>
              </span>
            </div>

            <img src={goldenGateBridge} className="logo bridge" alt="golden-gate-bridge" />
            <div>
              {gameState ?
                'Congrats!' : 'Oh no!'
              }

            </div>
            <button onClick={() => {
              setInitialCity(true)
              setShowResult(!showResult)}}>Try Again</button>
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



