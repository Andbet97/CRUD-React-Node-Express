const express = require('express');
const cors = require('cors');

const app = express();

// setting
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/api/clients', (req, res) => res.send('clients'));


module.exports = app;
