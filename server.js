/* eslint-disable no-console */
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  validator = require('express-validator'),
  errorhandler = require('errorhandler'),
  isProduction = process.env.NODE_ENV === 'production';
  // path = require('path');

// Load environment variables
require('dotenv').config();

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());

app.use(require('method-override')());

app.use(express.static(`${__dirname}/FrontEnd/dist`));

if (!isProduction) {
  app.use(errorhandler());
}

app.use(require('./API/routes'));

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/FrontEnd/dist/index.html')));

app.get('/API', (req, res) => res.status(200).send('Welcome to Fast Foods API created by PeerlessTech'));

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

module.exports = app;
