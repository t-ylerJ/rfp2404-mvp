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

  const response = axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    params: params,
    headers: {
      "Authorization": `"Bearer ${process.env.ACCESS_TOKEN}"`,
          "Content-Type": "application/json"
      }
    })
    const trips = response.data;

    const ticketPrice = ticketSearch(trips, 'total')
      setCities(
        cities.map((city) => (
          city.price = ticketPrice()
      )))

      return response;
    };
  const fetchCityPrices = async () => {
    const cityPromises = cities.map((city) => {
      return getFlights(city.code)
    });
    const updatedCities = await Promise.all(cityPromises);
      setCities(updatedCities);
  }