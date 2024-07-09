const express = require('express');
const axios = require('axios')
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.port || 3000;
const API_SERVER_URL = '';


app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('/Users/tylerjohnson/hackreactor/rfp2404/mvp/rfp2404-mvp/flightSF/public'))


app.get('/*', (req, res) => {
  const config = {
    method: GET, //req.method
    url: `${API_SERVER_URL}${req.url}`,
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  };

  axios(config)
    .then((response) => {
    res.status(response.status).json(response.data)
    })
    .catch((error) => {
    error.response ? res.status(error.response.status).json(error.response.data) : res.status(500).json(error.message);
    });
});



app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});

