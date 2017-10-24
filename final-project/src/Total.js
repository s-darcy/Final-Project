import React, { Component } from 'react';
import _ from 'lodash';

class Total extends Component {

    render(){

      return (
        <div>
            <p>${this.props.totalPrice}.00</p>
        </div>
      );
    }     
}  
export default Total;