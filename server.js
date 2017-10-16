const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'BreweryTapHandles'
});
const app = express();

connection.connect();

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

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(5000, function () {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});