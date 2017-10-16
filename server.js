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

//Pulls all product details from TapHandles table
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

//Insert Post 1
app.get('/addpost', (req, res) => {
    let sql = "INSERT INTO `Order` (CustomerID, Quantity, TotalPrice) VALUES ?";
    var values = [
        [2, 3, 90.00],
        [3, 2, 50.00]
    ];
    connection.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added');
    });
});

//Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM \`TapHandles\` WHERE ProductID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
    let newQuantity = 'Updated Quantity';
    let sql = `UPDATE \`Order\` SET Quantity = '${newQuantity}' WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//Delete Post
app.get('/deletepost/:id', (req, res) => {
    let newQuantity = 'Updated Quantity';
    let sql = `DELETE FROM \`Order\` WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen(5000, () => {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});