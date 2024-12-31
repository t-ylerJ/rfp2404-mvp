// import Amadeus from 'amadeus';
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

  const options = {
    method: 'GET',
    url: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
    params: {
      currencyCode: 'USD',
      originLocationCode: 'NYC',
      destinationLocationCode: 'SFO',
      departureDate: '2025-05-02',
      adults: 1,
      nonStop: false,
      max: 250,
    },
    headers: {
      accept: 'application/vnd.amadeus+json',
      Authorization: 'Bearer g0VszxeH2LMSqOEmfGpRpVMGXjYU',
    },
  };

  axios.request(options)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

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
      "Authorization": `"Bearer ${process.env.ACCESS_TOKEN}"`,
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






