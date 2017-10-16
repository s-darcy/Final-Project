const _ = require('lodash');
const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const request = require('superagent');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'BreweryTapHandles',
  port: 8889
});

connection.connect((err) => {
    if(!!err){
        console.log("Error connecting to Shane's Database");
    } else {
        console.log("Connected to Shane's Database");
    }
});

const app = express();

// app.use(express.bodyParser());

app.get('/', (req, res) => {
    connection.query("SELECT * FROM TapHandles", (err, result) => {
        if(!!err){
            console.log('Error in the query');
        } else {
            console.log('Successful query');
            console.log(result);
            res.send('Database created...');
        }
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen('5000', () => {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});