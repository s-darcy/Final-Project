import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // this.state = data;
}

  render() {
    return (
      <div className="App">
        <img alt="21st Amendment Blah, Blah, Blah Tap Handle" src="../TapHandles/21stAmendment.JPG" />
        <img alt="Terrapin Hopsecutioner Tap Handle" src="../TapHandles/Terrapin.JPG" />
        <img alt="Wicked Weed Freak of Nature Tap Handle" src="../TapHandles/WickedWeed.JPG" class="wickedWeed" />
        <img alt="Coast Brewing Tap Handle" src="../TapHandles/Coast.JPG" />
        <img alt="The Unknown Brewing Tap Handle" src="../TapHandles/Unknown.JPG" />
        <img alt="Sweet Water 420 Tap Handle" src="../TapHandles/SweetWater.JPG" />
        <img alt="Legal Remedy Brewing Tap Handle" src="../TapHandles/LegalRemedy.JPG" />
        <img alt="Stone IPA Tap Handle" src="../TapHandles/Stone.JPG" />
        <img alt="Sierra Nevada Torpdeo Tap Handle" src="../TapHandles/SierraNevada.JPG" />
        <img alt="Scofflaw Brewing Tap Handle" src="../TapHandles/Scofflaw.JPG" />
        <img alt="Triple C Brewing Tap Handle" src="../TapHandles/TripleC.JPG" />
        <img alt="NoDa Brewing Tap" src="../TapHandles/NoDa.JPG" />
      </div>
    );
  }
}

export default App;
