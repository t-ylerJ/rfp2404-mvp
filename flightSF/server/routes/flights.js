import Amadeus from 'amadeus';
import express from 'express';
import axios from 'axios';

const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})


export function getFlightPrices(req, res) {

  // var flightSearch = {
  //   "currencyCode": "USD",
  //   "originDestinations": [
  //     {
  //       "id": "1",
  //       "originLocationCode": req.body.location,
  //       "destinationLocationCode": "SFO",
  //       "departureDateTimeRange": {
  //         "date": "2024-11-01"
  //       }
  //     }
  //   ],
  //   "travelers": [
  //     {
  //       "id": "1",
  //       "travelerType": "ADULT"
  //     }
  //   ],
  //   "searchCriteria": {
  //   "maxFlightOffers": 2
  //     },
  //   "sources": [
  //     "GDS"
  //   ]
  // }
  var params = {
    currencyCode: "USD",
    originLocationCode: req.body.location,
    destinationLocationCode: "SFO",
    departureDate: "2024-11-01",
    adults: 1
  }

  axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    params: params,
    headers: {
      "Authorization": "Bearer oAsCQpSzMg8pxzAAwmHDrZ1LbpZU",
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      res.send(response.result);
    })
    .catch((err) => {
      res.status(500).send('Error fetching flight data');
      console.error('Error fetching flight data:', err)
  })
}






