import path from 'path';
import cors from 'cors';
import Amadeus from 'amadeus';
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { getFlightPrices } from './routes/flights.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

const app = express();
const PORT = process.env.PORT || 5000;
// const amadeus = new Amadeus({
//   clientId: process.env.API_KEY,
//   clientSecret: process.env.API_SECRET
// })

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(publicPath))
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.post('/priceAlerts');

app.get('/api/flights', async (req, res) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get();
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});
// app.all('https://test.api.amadeus.com/v2/shopping/flight-offers', getFlightPrices);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});