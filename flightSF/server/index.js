import cors from 'cors';
import Amadeus from 'amadeus';
import express from 'express';
import axios from 'axios';
import morgan from 'morgan';
import 'dotenv/config';

const amadeus = new Amadeus({
  clientId: 'process.env.API_TOKEN',
  clientSecret: 'process.env.API_SECRET'
})
const app = express();
// const PORT = process.env.port || 3000;
const PORT = 5000;



app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('/Users/tylerjohnson/hackreactor/rfp2404/mvp/rfp2404-mvp/flightSF/public'))
app.use(cors({
  origin: 'http://localhost:5173'
}));



app.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  amadeus.referenceData.locations
  .get({
    keyword: parameter,
    subType: Amadeus.location.any,
  })
  .then((response) => {
    res.send(response.result);
  })
  .catch((err) => {
    res.status(500).send('Error fetching city and airport data');
    console.error('Error fetching city/airport data:', err)
  })
})





app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});