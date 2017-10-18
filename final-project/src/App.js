import React, { Component } from 'react';
import './App.css';
import request from 'superagent';

class App extends Component {

  constructor() {
    super();
    this.state = {
      products : [],
      quantity : [],
      
      title: 'Craft Beer Tap Handles Store'
    };

    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
  }

  handleQuantity(event) {
    event.preventDefault();
    let quantitySelected = event.target.value;
    this.state.quantity.push(quantitySelected);
    this.setState({value: quantitySelected});
    console.log("You have added " + quantitySelected);
    console.log(this.state.quantity);
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
          <div>
            <form>
              <button name="21st Amendment Blah, Blah, Blah Tap Handle" onClick={this.handleProducts}>
                <h3>21st Amendment Blah, Blah, Blah Tap Handle</h3>
                <img onClick={this.handleProducts} alt="21st Amendment Blah, Blah, Blah Tap Handle" src="img/21stAmendment.JPG" />
              </button>
              <select value={this.state.value} onChange={this.handleQuantity}>
                <option value="null">--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </form>  
          </div>
          <div>
            <img alt="Terrapin Hopsecutioner Tap Handle" src="img/Terrapin.JPG" />
          </div>
          <div>
            <img alt="Wicked Weed Freak of Nature Tap Handle" src="img/WickedWeed.JPG" className="wickedWeed" />
          </div>
          <div>
            <img alt="Coast Brewing Tap Handle" src="img/Coast.JPG" />
          </div>
          <div>
            <img alt="The Unknown Brewing Tap Handle" src="img/Unknown.JPG" />
          </div>
          <div>
            <img alt="Sweet Water 420 Tap Handle" src="img/SweetWater.JPG" />
          </div>
          <div>
            <img alt="Legal Remedy Brewing Tap Handle" src="img/LegalRemedy.JPG" />
          </div>
          <div>
            <img alt="Stone IPA Tap Handle" src="img/Stone.JPG" />
          </div>
          <div>
            <img alt="Sierra Nevada Torpdeo Tap Handle" src="img/SierraNevada.JPG" />
          </div>
          <div>
            <img alt="Scofflaw Brewing Tap Handle" src="img/Scofflaw.JPG" />
          </div>
          <div>
            <img alt="Triple C Brewing Tap Handle" src="img/TripleC.JPG" />
          </div>
          <div>
            <img alt="NoDa Brewing Tap" src="img/NoDa.JPG" />
          </div>
        </div>
      </div> //App
    );
  }

  componentWillMount() {
    var self = this;
    request.get('http://localhost:5000/products')
    .then((res) => {
      //SET STATE ON THIS
      console.log("here response: ", res.body);
    })
    .catch((err) => {
      console.log(err);
    });
  };
}


export default App;
