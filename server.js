const _ = require('lodash');
const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
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
const router = express.Router();

app.use(bodyParser.json());

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
    let sql = `SELECT * FROM BreweryTapHandles.Order WHERE OrderID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(JSON.stringify(result));
        console.log(result);
        res.send(res.body);
    });
});

//Insert an order (WORKS)
router.post('/addpost', (req, res) => {
    let insertOrderQuery = `INSERT INTO
    BreweryTapHandles.Order (DateAdded)
    VALUES (NOW())`;

    connection.query(insertOrderQuery, (err, result) => {
        if(err) throw err;

        let selectedProducts = req.body.selectedProducts;
        let orderID = result.insertId;

        let insertProductsQuery = `INSERT INTO
            BreweryTapHandles.SelectedProducts (OrderID, ProductID, Quantity)
        VALUES `;

        for (let key in selectedProducts) {
            if (key != 0) {
                insertProductsQuery += `, `;
            }
            insertProductsQuery += `(${orderID}, ${selectedProducts[key].productId}, ${selectedProducts[key].quantity})`;
        }

        connection.query(insertProductsQuery, (err, result) => {
            if(err) throw err;
            // console.log(result);
            res.json({
                message: 'Post 1 added',
                orderID
            });
        });
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

//Delete an order (WORKS)
router.delete('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM BreweryTapHandles.Order WHERE OrderID = ${req.params.id}`;
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