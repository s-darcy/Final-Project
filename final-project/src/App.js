import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import ProductInfo from './ProductInfo';

class App extends Component {

  constructor() {
    super();
    this.state = {
      availableProducts : [],
      products : [],
      quantity : [],
      value: '',

      title: 'Craft Beer Tap Handles Store'
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);

    this.fetchProducts();
  }

  handleQuantity(event) {
    event.preventDefault();
    let quantitySelected = event.target.value;

    this.state.quantity.push(quantitySelected);
    this.setState({
      value: quantitySelected
    });

    console.log("You have added " + quantitySelected);
    console.log(this.state.quantity);
  }

  handleProducts(event) {
    event.preventDefault();
    let productSelected = event.target.name;
    let priceSelected = event.target.value;

    let productAndPrice = "$" + priceSelected + ".00 - " + productSelected;
    console.log(productAndPrice);

    this.state.products.push(productAndPrice);
    this.setState({value: productAndPrice});
  }

  render() {
    let title = this.state.title;
    let quantity = this.state.quantity;
    let products = this.state.products;

    let eachProduct = 
      this.state.availableProducts.map((availableProducts, i) => {
      return (
        <ProductInfo
          key={i}
          product={availableProducts}
          value={this.state.value}
          handleQuantity = {this.handleQuantity}
          handleProducts = {this.handleProducts}
        /> 
      );
    }, this); 

    return (
      <div className="App">
        <div className="wrapper">
          <h1>{title}</h1>
          <div className="shoppingCart">
            <h3>Your Cart
              <img className="theCart" alt="shopping cart icon" src="/img/shopping-cart.PNG" />
            </h3>
            <ul>
              {products.map((productAndPrice, i) => <li className="cartItems">{}{productAndPrice}</li>)}
              {quantity.map((quantitySelected, i) => <li className="cartItems">{quantitySelected}</li>)}
            </ul>
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
}

export default App;
