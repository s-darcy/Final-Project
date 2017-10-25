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
    if(err){
        console.log("Error connecting to Shane's Database");
    } else {
        console.log("Connected to Shane's Database");
    }
});

const app = express();
const router = express.Router();

app.use(bodyParser.json());

//Pulls all the products details from TapHandles table 
router.get('/products', (req, res) => {
    let sql = `SELECT * FROM \`TapHandles\``;
    connection.query(sql, (err, result) => {
        if(err){
            return console.log('Error in the query');
        } else {
            res.json(result);
            console.log('Successful query');
            console.log(result);
        }
    });
});

//Finds a single order from Orders Table
router.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM BreweryTapHandles.Order WHERE OrderID = ${req.params.id}`;
    
    connection.query(sql, (err, result) => {
        if(err){
            return res.send();
        }
        return res.json(result);
        console.log(result);
        res.send(res.body);
        res.end();
    });
});

//Finds a single order from SelectedProducts Table 
//and Joins it on the TapHandles table
router.get('/selectedproducts/:id', (req, res) => {
    let sql = `SELECT * 
    FROM BreweryTapHandles.SelectedProducts SP
    LEFT JOIN BreweryTapHandles.TapHandles TH 
    ON SP.ProductID = TH.ProductID
    WHERE OrderID = ${req.params.id}`;
    
    connection.query(sql, (err, result) => {
        if(err){
            return res.send();
        }
        return res.json(result);
        console.log(result);
        res.send(res.body);
        res.end();
    });
});

//Insert an order 
//1. Inserts an order into the Order Table
//2. With the returned OrderID, Inserts a new Order into the Selected Products Table
router.post('/addpost', (req, res) => {
    let insertOrderQuery = `INSERT INTO
    BreweryTapHandles.Order (DateAdded)
    VALUES (NOW())`;

    connection.query(insertOrderQuery, (err, result) => {
        if(err) {
            throw err;
        }
        let selectedProducts = req.body.selectedProducts;
        let orderID = result.insertId;

        let insertProductsQuery = `INSERT INTO
            BreweryTapHandles.SelectedProducts (OrderID, ProductID, Quantity)
        VALUES `;

        for (let key in selectedProducts) {
            if (key != 0) {
                insertProductsQuery += `, `;
            }
            insertProductsQuery += `(${orderID}, ${selectedProducts[key].productID}, ${selectedProducts[key].quantity})`;
        }

        connection.query(insertProductsQuery, (err, result) => {
            if(err){
                throw err;
            }
            // console.log(result);
            res.json({
                message: 'Post 1 added',
                orderID
            });
        });
    });
});

// //Update an order the quantity 
// router.put('/updatepost/:id', (req, res) => {
//     let newQuantity = 'Updated Quantity';
//     let sql = `UPDATE \`Order\` SET Quantity = '${newQuantity}' WHERE OrderID = ${req.params.id}`;
//     connection.query(sql, (err, result) => {
//         if(err){
//             return res.send();
//         }
//         res.json(result);
//         console.log(result);
//         res.send('Post updated...');
//     });
// });

//(NOT WORKING YET)Update an order
router.put('/updatepost/:id', (req, res) => {
    
    let productsToUpdate = req.body.productsToUpdate;

    let insertUpdatedProducts = 
    `UPDATE BreweryTapHandles.SelectedProducts
    SET (ProductID, Quantity) 
    WHERE SelectedProductsID = ${req.params.id}`;

    for (let key in productsToUpdate) {
        if (key != 0) {
            insertUpdatedProducts += `, `;
        }
        insertUpdatedProducts += `(${productsToUpdate[key].productID}, ${productsToUpdate[key].quantity})`;
    }

    connection.query(insertUpdatedProducts, (err, result) => {
        if(err){
            throw err;;
        }
        console.log(result);
        res.json({
            message: 'Post updated...'
        });
    });
});

//Delete an entire order 
router.delete('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM BreweryTapHandles.Order WHERE OrderID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err){
            return console.log('We could not find that Order ID');
        } else {    
            console.log(result);
            res.send('Post deleted...');
        }
    });
});

//Delete just one Product from the Selected Products
router.delete('/removeproduct/:id', (req, res) => {
    let sql = `DELETE FROM BreweryTapHandles.SelectedProducts WHERE SelectedProductsID = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if(err){
            return console.log('We could not find that Order ID');
        } else {    
            console.log(result);
            res.send('This product has been deleted...');
        }
    });
});

//This bypass CORS Errors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use('/', router);

app.listen(5000, () => {
  console.log('The Beer Taps Ecommerce site is running on Port 5000!')
});