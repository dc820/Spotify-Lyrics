/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import * as express from 'express';
import {join} from 'path';

// Express server
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request'); // "Request" library
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();

const client_id = process.env.client_id; // Your client id
const client_secret = process.env.client_secret; // Your secret
const redirect_uri = process.env.redirect_uri; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param number length The length of the string
 * @return string The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SPOTIFY - Express Rest API endpoints
app.get('/api/spotify/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-currently-playing user-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    }));
 });
app.get('/api/spotify/callback', (req, res) => {
 // your application requests refresh and access tokens
 // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        process.env.access_token = body.access_token;
        process.env.refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + process.env.access_token },
          json: true
        };
        // use the access token to access the Spotify Web API
        request.get(options, (err, reply, profile) => {
          console.log(profile);
          const now = new Date().getTime(); // current time in milliseconds
          const expirationTime = body.expires_in;  // given in seconds
          const expires = now + expirationTime; // need conversion then add
          console.log('token expires on ' + expires);
          res.redirect('/results/#' +
            querystring.stringify({
              user: profile.id,
              session: expires
          }));
        });

        // we can also pass the token to the browser to make requests from there
        /* res.redirect('/#' +
          querystring.stringify({
            access_token,
            refresh_token
          }));*/
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('get_token', (req, res) => {
  res.send({
    access_token: process.env.access_token
  });
});

app.get('/api/spotify/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: process.env.refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      process.env.access_token = body.access_token;
      res.send({
        access_token: process.env.access_token,
        expires_in: body.expires_in
      });
    }
  });
});

// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
