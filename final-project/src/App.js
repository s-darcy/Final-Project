import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      quantity: [],
      title: 'Craft Beer Tap Handles Store'
    };

    this.handleQuantity = this.handleQuantity.bind(this);
  }

  handleQuantity(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
    console.log("You have added " + event.target.value);
  }

  render() {
    let title = this.state.title;
    return (
      
      <div className="App">
        <h1>{title}</h1>
        <div className="products">
          <div>
            <h2>21st Amendment Blah, Blah, Blah Tap Handle</h2>
            <form>
              <img alt="21st Amendment Blah, Blah, Blah Tap Handle" src="img/21stAmendment.JPG" />
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
}

export default App;
