import { useState, useEffect, useId } from 'react';
import axios from 'axios';
import '../App.css';

function FlightData () {

//When getFlights is invoked, the price property for each stored route is updated to match recently pulled prices

const getFlights = async function (location) {
  var params = {
    currencyCode: "USD",
    originLocationCode: location,
    destinationLocationCode: "SFO",
    departureDate: "2024-11-01",
    adults: 1
  }
// recursively searches fetched data for (avg) cost of ticket for given departure date
  const ticketSearch = (obj, target) =>
    target in obj
  ? obj[target]
  : Object.values(obj).reduce((acc, val) => {
    if (acc !== undefined) return acc;
    if (typeof val === 'object') return ticketSearch(val, target);
  }, undefined);
// fetches data to search for ticket costs
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
      )));
      return response;
    };
  const fetchCityPrices = async () => {
    const cityPromises = cities.map((city) => {
      return getFlights(city.code)
    });
    //updates the price property for each flight to reflect the recently fetched price
    const updatedCities = await Promise.all(cityPromises);
      setCities(updatedCities);
  }

  return;
}

export default FlightData;