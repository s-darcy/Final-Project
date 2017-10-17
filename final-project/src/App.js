import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // this.state = data;
}

  render() {
    return (
      <div className="App products">
        <div>
          <img alt="21st Amendment Blah, Blah, Blah Tap Handle" src="../TapHandles/21stAmendment.JPG" />
        </div>
        <div>
          <img alt="Terrapin Hopsecutioner Tap Handle" src="../TapHandles/Terrapin.JPG" />
        </div>
        <div>
          <img alt="Wicked Weed Freak of Nature Tap Handle" src="../TapHandles/WickedWeed.JPG" className="wickedWeed" />
        </div>
        <div>
          <img alt="Coast Brewing Tap Handle" src="../TapHandles/Coast.JPG" />
        </div>
        <div>
          <img alt="The Unknown Brewing Tap Handle" src="../TapHandles/Unknown.JPG" />
        </div>
        <div>
          <img alt="Sweet Water 420 Tap Handle" src="../TapHandles/SweetWater.JPG" />
        </div>
        <div>
          <img alt="Legal Remedy Brewing Tap Handle" src="../TapHandles/LegalRemedy.JPG" />
        </div>
        <div>
          <img alt="Stone IPA Tap Handle" src="../TapHandles/Stone.JPG" />
        </div>
        <div>
          <img alt="Sierra Nevada Torpdeo Tap Handle" src="../TapHandles/SierraNevada.JPG" />
        </div>
        <div>
          <img alt="Scofflaw Brewing Tap Handle" src="../TapHandles/Scofflaw.JPG" />
        </div>
        <div>
          <img alt="Triple C Brewing Tap Handle" src="../TapHandles/TripleC.JPG" />
        </div>
        <div>
          <img alt="NoDa Brewing Tap" src="../TapHandles/NoDa.JPG" />
        </div>
      </div>
    );
  }
}

export default App;
