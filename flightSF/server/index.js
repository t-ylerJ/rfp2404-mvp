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
const router = express.Router();
const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET
})

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
router.post('/auth', async (req, res) => {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `'Bearer ${process.env.ACCESS_TOKEN}'`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }, body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.API_KEY,
        clientSecret: process.env.API_SECRET,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    res.json({ access token: , data.access_token });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});

module.exports = router;