const config = require('./config.js');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

const app = express();

console.log(`NODE_ENV=${config.NODE_ENV}`);

// middleware
app.use(express.json());
app.use(cookieParser());


// app
app.use(routes);

mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(config.PORT, config.HOST, () => {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
    console.log('We are online bitch!');     
  }))
  .catch((err) => console.log(err));