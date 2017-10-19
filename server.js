const _ = require('lodash');
const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
const mysql = require('mysql');
// let application = require('/final-project/src/app.js');

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
const router = express.Router();

// app.use(express.bodyParser());

//Pulls the description details from TapHandles table
router.get('/products', (req, res) => {
    let sql = `SELECT * FROM \`TapHandles\``;
    connection.query(sql, (err, result) => {
        if(!!err){
            console.log('Error in the query');
        } else {
            res.json(result);
            console.log('Successful query');
            console.log(result);
        }
    });
});

//Select single order
router.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM \`TapHandles\` WHERE ProductID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
        console.log(result);
        // res.send('Post fetched...');
    });
});

//Insert an order
router.get('/addpost', (req, res) => {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let sql = "INSERT INTO `Order` (CustomerID, Quantity, Date, TotalPrice) VALUES ?";
    var values = [
        [2, 3, mysqlTimestamp, 90.00],
        [3, 2, mysqlTimestamp, 50.00]
    ];
    connection.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added');
    });
});

//Update an order
router.get('/updatepost/:id', (req, res) => {
    let newQuantity = 'Updated Quantity';
    let sql = `UPDATE \`Order\` SET Quantity = '${newQuantity}' WHERE OrderID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.end(JSON.stringify(result));
        console.log(result);
        res.send('Post updated...');
    });
});

//Delete an order
router.get('/deletepost/:id', (req, res) => {
    let newQuantity = 'Updated Quantity';
    let sql = `DELETE FROM \`Order\` WHERE OrderID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
        console.log(result);
        res.send('Post deleted...');
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', router);

app.listen(5000, () => {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});