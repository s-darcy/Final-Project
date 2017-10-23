import React, { Component } from 'react';
import './App.css';
import superagent from 'superagent';
import _ from 'lodash';
import ProductInfo from './ProductInfo';
import ShoppingCart from './ShoppingCart';
import Total from './Total'; 
import SearchOrder from './SearchOrder';
import ThankYou from './ThankYou';
import OrderCheck from './OrderCheck';

class App extends Component {

  constructor() {
    super();
    this.state = {

      //State for server 
      availableProducts : [],
      orderPlaced : [],
      selectedProducts : [],
      orderProducts : [],
      previousOrder : [],
    
      //React arrays for storing state for render purposes only
      customerID : [],
      thankYou: false,
      products : [],
      price: [],
      quantity : [],
      quantityHandled : [],
      idText : [],
      value: '',
      searchIDText: '',


      title: 'Craft Beer Tap Handle Store'
    };

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.submitQuantity = this.submitQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.submitOrderID = this.submitOrderID.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    this.submitOrdertoDB = this.submitOrdertoDB.bind(this);
    this.storeOrderDetails = this.storeOrderDetails.bind(this);
    this.handleThankYou = this.handleThankYou.bind(this);
    this.handleSearchIDTextChange = this.handleSearchIDTextChange.bind(this);
    this.handleSearchIDTextSubmit = this.handleSearchIDTextSubmit.bind(this);
    this.findOrder = this.findOrder.bind(this);

    this.fetchProducts();
    // this.submitOrderToServer();
  }

  //This function stores the whole order details (CustomerID, Quantity, Prices, ProductID)
  storeOrderDetails (event) {
    event.preventDefault();

    //CustomerID
    let customerID = this.state.customerID;

    //Prices
    let prices = this.state.price.slice();

    //ProductIDs  
    let productID = this.state.selectedProducts.slice();

    //Quantity
    let quantity = this.state.quantity.slice();

    this.state.orderPlaced.push([customerID, quantity, prices, productID]);
    this.setState({
      orderPlaced: [customerID, quantity, prices, productID]
    });
  }

   //Creates Custom Customer ID on page load
  //  componentWillMount() {
  //   let createID = _.uniqueId(Math.floor(Math.random() * 10000000 + 1));
    
  //   console.log(createID);
  //   this.state.customerID.push(createID); 
  //   this.setState({ 
  //   value : createID
  //   });
  // }

  //Stores the productID only for the Order Submitted
  submitOrderID (event) {
    event.preventDefault();
    let productSubmitted = event.target.value;
    console.log(productSubmitted);

    this.state.selectedProducts.push(productSubmitted);
    this.setState({
      value: productSubmitted
    });
  }

  //(NOT WORKING) Store the entire product details for the order submitted
  //by comparing the selected ProductID against all the product's ProductID
  submitOrder (product, event) {
    event.preventDefault();

    let originalProducts = this.state.availableProducts.slice();
    console.log(originalProducts);
    let findProduct = originalProducts.find((original) => {
      if (original.ProductID == product){
        return original;
      };
    });
    console.log(findProduct);
    this.state.orderProducts.push(findProduct);
    this.setState({
      value: findProduct
    });
  }

  submitOrdertoDB (product, event) {
    // event.preventDefault();

    let fakeObject = {
      "selectedProducts": [
          {
              "productId": 5,
              "quantity": 2
          },
          {
              "productId": 6,
              "quantity": 1
          }
      ]
  };

    superagent.post('http://localhost:5000/addPost')
    .send(fakeObject)
    .then(
      // Do whatever with the response
      (res) => {
        console.log(res.status, res.body.orderID);
        this.setState({
          customerID: res.body.orderID
        });
      }
    );
  }

  //Helps the quantity select drop down
  handleQuantity(event) {
    event.preventDefault();
    let quantitySelected = event.target.value;
    console.log(quantitySelected);
    this.state.quantityHandled.push(quantitySelected);
    this.setState({
      value: quantitySelected
    });
  } 
  
  //Quantity that renders in the shopping cart
  submitQuantity (event) {
    event.preventDefault();
    let submittedQuantity = this.state.value;
    console.log(submittedQuantity);
    this.state.quantity.push(submittedQuantity);
    this.setState({
      value: submittedQuantity 
    });
  }

  //Renders the product and the price in the shopping cart
  handleProducts(event) {
    event.preventDefault();

    //Handles products name, which allows it to show in the shopping cart
    let productSelected = event.target.name;
    this.state.products.push(productSelected);
    this.setState({
      value: productSelected 
    });
    
    //Handles the price, which allows it to show in the shopping cart
    let priceSelected = event.target.id;
    this.state.price.push(priceSelected);
    this.setState({
      value: priceSelected 
    });
    console.log("The product you chose is " + productSelected + " at $" + priceSelected);
  }

  //Empties the shopping cart by setting all the array lengths back to 0
  emptyCart(event) {
    let orderProducts = this.state.orderProducts;
    
    console.log(orderProducts);
    let empty = orderProducts.length = 0;

    this.setState({
      orderProducts : empty
    });
  }

  //Clears pending shopping cart with a window refresh
  refreshPage() {
    window.location.reload();
  } 

  //Thank You Message State
  handleThankYou() {
    this.setState({
      thankYou: !this.state.thankYou
    });
  }

  //Handles the Changing Input text into the Search fields
  handleSearchIDTextChange(event) {
    const newSearch = event.target.value;
    let text = Object.assign({}, this.state.searchIDText);
    text = newSearch;
    
    this.setState({
        "searchIDText" : text
    });
  }

  //Handles the Submission of the Input text into the Search fields and store it in state
  handleSearchIDTextSubmit(event){
    event.preventDefault();
    let searchID = event.target.searchIDText;
    // this.state.idText.push(searchID);
    
    // this.setState({
    //   "idText" : searchID
    // });

    //Clears the Input Field
    var IDInput = document.getElementById("IDInput");
    IDInput.reset();
  }

  //Searches Database for specific submitted order by OrderID
  findOrder (event) {
    event.preventDefault();
    let searchedID = this.state.searchIDText;
    console.log(searchedID);

    superagent.get(`http://localhost:5000/getpost/${searchedID}`)
    .query('id=')
    .send(searchedID)
    .then(

      // Store the response in an array for PreviousOrder 
      //so I can use React to ask if they want to Delete or Edit
      (res) => {
        console.log(res.status, res.body.orderID);
        this.setState({
          previousOrder: res.body
        });
      }
    );
  }

//This is the <App /> Render
  render() {
    var table = {width: '100%'};
    
    let title = this.state.title;
    let quantity = this.state.quantity;
    let products = this.state.products;
    let price = this.state.price;
    let customerID = this.state.customerID;

    //(NOT WORKING) Rendering the shopping cart total
    let cost = this.state.price.map((value, index) => {
      let priceQuantity = quantity[index];
      return(
        <Total
          key={index}
          price={this.value}
          priceQuantity={this.priceQuantity}
        />
      );
    }, this);

    //Injects the Thank You Component
    let thankYouMessage =
        <ThankYou
          customerID={customerID}
      />  

    //Main Component that render to page on refresh
    let eachProduct = 
      this.state.availableProducts.map((availableProducts, i) => {
      return (
        <ProductInfo
          key={i}
          product={availableProducts}
          quantity={this.quantity}
          quantityHandled={this.quantityHandled}
          value={this.state.value}
          handleQuantity = {this.handleQuantity}
          handleProducts = {this.handleProducts}
          submitQuantity = {this.submitQuantity}
          submitOrderID = {this.submitOrderID}
          submitOrder = {this.submitOrder}
        /> 
      );
    }, this);
    
    //After Order ID Requested for DB, rendering Delete Option to the page
    let foundPreviousOrder = 
    this.state.previousOrder.map((previousOrder, i) => {
    return (
      <OrderCheck
        previousOrder={previousOrder}
        refreshPage={this.refreshPage}
      /> 
    );
  }, this);

    return (
      <div className="App">
        <h1>{title}</h1>
        <div className="wrapper">
          <section className="searchOrder">
            <div className="findOrder">
              <p>Would you like to edit or delete a previous order?</p>
              <form id="IDInput">
                <input 
                  type="text"
                  placeholder="Order ID?"
                  value={this.searchIDText}
                  onChange={this.handleSearchIDTextChange}
                />
                <img className="magnifyingGlass" src="img/magnifying_glass.PNG" alt="magnifying glass icon" />
                <button
                  className="find"
                  type="submit" 
                  onClick={(event) => {
                    this.handleSearchIDTextSubmit(event),
                    this.findOrder(event)
                  }}><span>Find</span></button>
              </form>
              {foundPreviousOrder}      
            </div>
          </section>    
          <div className="shoppingCart">
            <h3>Your Cart
              <img className="theCart" alt="shopping cart icon" src="/img/shopping-cart.PNG" />
            </h3>
            <table style={table}>
              <table className="innerTables headerName">
                <thead>
                  <tr>
                    <th>Tap Handle Name</th>
                  </tr>  
              </thead>
              <tbody>       
                  <tr>
                    {products.map((productSelected, i) => <td key={i} className="cartItems">{productSelected}</td>)}
                  </tr>
              </tbody>
              </table>
              <table className="innerTables headerPrice">
                <thead>
                  <tr>
                    <th>Price</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr>
                    {price.map((priceSelected, i) => <td key={i} className="cartItems">${priceSelected}.00</td>)}     
                  </tr>
                </tbody>   
              </table>
              <table className="innerTables headerQty">
                <thead>
                  <tr>
                    <th>Qty</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr>
                    {quantity.map((quantityToSubmit, i) => <td key={i} className="cartItems">{quantityToSubmit}</td>)}   
                  </tr>
                </tbody>   
              </table>             
              <tfoot>
              <button type="submit" className="submitCart" onClick={(event) => {
                this.handleThankYou(event),
                this.submitOrdertoDB(event)
              }}>
                <tr>    
                  <td>Place Order</td>
                </tr>
              </button>   
              <input 
                type="button" 
                value="Clear Cart"
                className="emptyCart"  
                onClick={this.refreshPage}/>
                <tr className="total">
                  <td>Total</td>
                  <td>${cost}</td>
                </tr>
              </tfoot>   
            </table>
            <div>
              {this.state.thankYou && thankYouMessage}
            </div>
          </div>
          <div className="products"> 
            {eachProduct}
          </div>
          <footer>
            <p>&copy; 2017<script>new Date().getFullYear()>2010&&document.write("-"+new Date().getFullYear());</script>, {this.state.title}</p>
          </footer>  
        </div>
      </div>   
      )
    }

  //Pulls in all of our products on initial render
  fetchProducts () {
    superagent.get('http://localhost:5000/products')
    .then((res) => {
      this.setState({
        availableProducts: res.body
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

} //Closes the app

export default App;
