import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import ProductInfo from './ProductInfo';

class App extends Component {

  constructor() {
    super();
    this.state = {
      availableProducts : [],
      selectedProducts : [],
      
      products : [],
      price: [],
      quantity : [],
      value: '',

      title: 'Craft Beer Tap Handles Store'
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.submitQuantity = this.submitQuantity.bind(this);

    this.fetchProducts();
  }

  //this function will get submit the order when the customer makes the purchase
  // selectedProducts(event) {
  //   event.preventDefault();


  // }

  handleQuantity(event) {
    event.preventDefault();
    let quantitySelected = event.target.value;
    this.state.quantity.push(quantitySelected);
    this.setState({
      value: quantitySelected
    });
  } 
  
  submitQuantity (event) {
    event.preventDefault();
    let submittedQuantity = this.state.value;
    console.log(submittedQuantity);
    this.state.quantity.push(submittedQuantity);
    this.setState({value: submittedQuantity });
  }

  handleProducts(event) {
    event.preventDefault();

    //Handles products name, which allows it to show in the shopping cart
    let productSelected = event.target.name;
    this.state.products.push(productSelected);
    this.setState({value: productSelected });
    
    //Handles the price, which allows it to show in the shopping cart
    let priceSelected = event.target.value;
    this.state.price.push(priceSelected);
    this.setState({value: priceSelected });

     //Handles the quantity, which allows it to show in the shopping cart 
    // let quantityToSubmit = Object.assign({}, this.state.quantity);
    // this.state.quantity.push(quantityToSubmit);
    // this.setState({value: quantityToSubmit});

    console.log("The product you chose is " + productSelected + " at $" + priceSelected);
  }

  render() {
    var table = {width: '100%'};
    // var left= {width: '33%',padding:'20px',verticalAlign: 'top'};
    // var center = {width: '33%',padding:'20px',verticalAlign: 'top'};
    // var right = {width: '33%',padding:'20px',verticalAlign: 'top'};
    
    let title = this.state.title;
    let quantity = this.state.quantity;
    let products = this.state.products;
    let price = this.state.price;

    let eachProduct = 
      this.state.availableProducts.map((availableProducts, i) => {
      return (
        <ProductInfo
          key={i}
          product={availableProducts}
          value={this.state.value}
          handleQuantity = {this.handleQuantity}
          handleProducts = {this.handleProducts}
          submitQuantity = {this.submitQuantity}
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
            <table style={table}>
              <table className="innerTables">
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
              <table className="innerTables">
                <thead>
                  <th>Price</th>
                </thead> 
                <tbody>
                  <tr>
                    {price.map((priceSelected, i) => <td key={i} className="cartItems">${priceSelected}.00</td>)}     
                  </tr>
                </tbody>   
              </table>
              <table className="innerTables">
                <thead>
                  <th>Qty</th>
                </thead> 
                <tbody>
                  <tr>
                  {quantity.map((quantityToSubmit, i) => <td key={i} className="cartItems">{quantityToSubmit}</td>)}
                  </tr>
                </tbody>   
              </table>             
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>${}</td>
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
}

export default App;
