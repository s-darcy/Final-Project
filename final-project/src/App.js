import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import ProductInfo from './ProductInfo';
import ShoppingCart from './ShoppingCart';
import Total from './Total'; 
import SearchOrder from './SearchOrder';

class App extends Component {

  constructor() {
    super();
    this.state = {
      //State for server 
      availableProducts : [],
      selectedProducts : [],
      orderProducts : [],

      //React arrays for storing state for render purposes only
      products : [],
      price: [],
      quantity : [],
      quantityHandled : [],
      value: '',

      title: 'Craft Beer Tap Handle Store'
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.submitQuantity = this.submitQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.submitOrderID = this.submitOrderID.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.emptyCart = this.emptyCart.bind(this);

    this.fetchProducts();
    // this.submitOrderToServer();
  }
  
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

  emptyCart(event) {
    let orderProducts = this.state.orderProducts;
    
    console.log(orderProducts);
    let empty = orderProducts.length = 0;

    this.setState({
      orderProducts : empty
    });
  }

  refreshPage() {
    window.location.reload();
} 

  render() {
    var table = {width: '100%'};
    
    let title = this.state.title;
    let quantity = this.state.quantity;
    let products = this.state.products;
    let price = this.state.price;

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

    return (
      <div className="App">
        <h1>{title}</h1>
        <div className="wrapper">
          <section className="searchOrder">
            <div>
              <p>Would you like to edit or delete an order?</p>
              <input type="text"
                placeholder="Order ID?"
                value =""
                onChange={this.props.handleTextChange}
              />
              <img className="magnifyingGlass" src="img/magnifying_glass.PNG" alt="magnifying glass icon" />
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
              <button type="submit" className="submitCart">
                <tr>    
                  <td>Place Order</td>
                </tr>
              </button>   
              <input type="button" value="Clear Cart" onClick={this.refreshPage} className="emptyCart" />
                <tr className="total">
                  <td>Total</td>
                  <td>${cost}</td>
                </tr>
              </tfoot>   
            </table>      
          </div>
        </div>  
        <div className="products"> 
          {eachProduct}
        </div>
        <footer>
          <p>&copy; 2017<script>new Date().getFullYear()>2010&&document.write("-"+new Date().getFullYear());</script>, {this.state.title}</p>
        </footer>  
      </div> 
    )
  }

  fetchProducts () {
    request.get('http://localhost:5000/products')
    .then((res) => {
      this.setState({
        availableProducts: res.body
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };



  // submitOrderToServer () {
  //   request.get('http://localhost:5000/addpost')
  //   .then(res) => {

  //   }
  //   connection.query(sql, [values], (err, result) => {
  //     if(err) throw err;
  //     console.log(result);
  //   });
  // };



} //Closes the app

export default App;
