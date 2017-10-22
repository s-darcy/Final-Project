import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';

class ThankYou extends Component {

    render(){

      return (

        <div className="thankYou">  
            <p>Thank you!</p>
            <p>Your Order Has Successfully Been Placed.</p>
            <p>Your ID to reference this order is <span className="customerID">{this.props.customerID}</span></p>
        </div> 
      );
    }     
}  
export default ThankYou;