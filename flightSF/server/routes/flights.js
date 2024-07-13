import Amadeus from 'amadeus';
import express from 'express';
import axios from 'axios';

const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})


export function getFlightPrices(req, res) {

  var flightSearch = {
    "currencyCode": "USD",
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": req.body.originLocationCode,
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

   axios.post('https://test.api.amadeus.com/v2/shopping/flight-offers', flightSearch,
      { headers: {
      "Authorization": `Bearer 88TcwJCvcwCrFK8SiyjeGHQQFSnq`,
      "Content-Type": "application/json"
    }}
   )
    .then((response) => {
      res.send(response.result);
    })
    .catch((err) => {
      res.status(500).send('Error fetching flight data');
      console.error('Error fetching flight data:', err)
  })
}






