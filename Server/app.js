var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/items", require('./routes/itemRoute'));
app.use("/users", require('./routes/userRoute'));

module.exports = app;
