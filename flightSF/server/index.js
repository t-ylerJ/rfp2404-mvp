const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //fix
const morgan = require('morgan'); //

const app = express();



app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../assets')))//

app.get('/flights', (req, res)

)
