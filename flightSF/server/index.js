import cors from 'cors';
import Amadeus from 'amadeus';
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { getFlightPrices } from './routes/flights.js';


const app = express();
const PORT = process.env.PORT || 5000;
const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('/Users/tylerjohnson/hackreactor/rfp2404/mvp/rfp2404-mvp/flightSF/public'))
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.all('https://test.api.amadeus.com/v2/shopping/flight-offers', getFlightPrices);


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});