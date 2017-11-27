const express = require('express');

var app = express();

app.use(function (req, res, next) {
  console.log(req.protocol + " " + req.method + " " + req.originalUrl);
  next();
});

app.use(express.static('client'));

module.exports = app;
