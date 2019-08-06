/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const spotifyRoutes = require('./routes/spotify');

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use('/api/spotify', spotifyRoutes);

module.exports = app;
