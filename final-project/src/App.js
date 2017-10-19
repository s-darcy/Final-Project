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
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  handleProducts(event) {
    event.preventDefault();
    let productSelected = event.target.name;
    this.state.products.push(productSelected);
    this.setState({value: productSelected});
    console.log("The product that you have selected is " + productSelected);
    console.log(this.state.products);
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
        /> 
      );
    }, this); 

    return (

      <div className="App">
        <h1>{title}</h1>
        <pre>
          {JSON.stringify(quantity, products)}
        </pre>
        <h2>Your Cart</h2> 
        <ul>
          {quantity.map((quantitySelected, i) => <li>{quantitySelected}</li>)}
          {products.map((productSelected, i) => <li>{productSelected}</li>)}
        </ul>
        <div className="products"> 
          {eachProduct}
        </div>
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
