import Amadeus from 'amadeus';
import express from 'express';
import axios from 'axios';


const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})


export function getFlightPrices(req, res) {
  const options = {
    method: 'GET',
    url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
    params: {
      currencyCode: 'USD',
      originLocationCode: 'NYC' //req.body.location,
      destinationLocationCode: 'SFO',
      departureDate: '2025-05-02',
      adults: 1,
      nonStop: false,
      max: 250,
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
    },
    headers: {
      accept: 'application/vnd.amadeus+json',
      Authorization: `"Bearer ${process.env.ACCESS_TOKEN}"`,
    },
  };

  axios.request(options)
    .then(response => {
      console.log(response.data);
      res.status(200).send(response.result);
    })
    .catch(error => {
      res.status(500).send('Error fetching flight data');
      console.error('Error fetching flight data:', error);
    });
}






