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
  database : 'BreweryTapHandles'
});

connection.connect((error) => {
    if(!!error){
        console.log("Error connecting to Shane's Database");
    } else {
        console.log("Connected to Shane's Database");
    }
});

const app = express();

// app.use(express.bodyParser());

app.get('/', (req, res) => {
    connection.query("SELECT * FROM TapHandles", (err, rows, fields) => {
        if(!!err){
            console.log('Error in the query');
        } else {
            console.log('Successful query');
        }
    });
});

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// });

// app.get("/",function(req,res){
//     connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
//     connection.end();
//       if (!err)
//         console.log('The solution is: ', rows);
//       else
//         console.log('Error while performing Query.');
//       });
//     });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(5000, () => {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});