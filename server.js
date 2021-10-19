const dotenv = require('dotenv');
dotenv.config();
const sanitizer = require('sanitizer');
const multer = require('multer'); // pour pouvoir recevoir des données dans le serveur API à partir d'un utilisateur extérieur
const upload = multer();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.static('public'));

app.use(cors());


app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept', 'Auhorization');
  next();
});

app.use(upload.array());

app.use((req, res, next) => {
  console.log('Server received ', req.body);

  for (let prop in req.body) {
    req.body[prop] = sanitizer.escape(req.body[prop]) // escape() replaces <, >, &, ', " and / with their corresponding HTML entities
    // added sanitizer,
  }
  next();
});

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
