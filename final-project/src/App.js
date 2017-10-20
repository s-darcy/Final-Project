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
      price: [],
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
    console.log(productSelected);
    let priceSelected = event.target.value;

    this.state.products.push(productSelected);
    this.setState({value: productSelected });

    this.state.products.push(priceSelected);
    this.setState({value: priceSelected });

    console.log("The product you chose is " + productSelected + "$" + priceSelected);
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
            <table>
              <thead>
                <tr>
                  <th>Tap Handle Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead> 
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>${}</td>
                </tr>
              </tfoot>
              <tbody> 
                <tr>  
                  {products.map((productSelected, i) => <td className="cartItems">{productSelected}</td>)}
                  {quantity.map((quantitySelected, i) => <td className="cartItems">{quantitySelected}</td>)}
                </tr>
              </tbody> 
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
}

export default App;
