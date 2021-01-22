const express = require('express');
const cors = require('cors');

const app = express();

// setting
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/api/clients', require('./routes/clients'));


module.exports = app;
