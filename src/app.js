const express = require('express');
const path = require('path')
require('./config/config')


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));


module.exports = app