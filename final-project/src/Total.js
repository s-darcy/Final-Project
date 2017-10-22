import React, { Component } from 'react';

class Total extends Component {

    render(){

        //(NOT WORKING)Calculates the total shopping cart for price and quantity
        let summingItUp = (a,b) => {
            return this.props.price * this.props.priceQuantity;
        }
        console.log(summingItUp); 

      return (
        <div>
            {summingItUp}
        </div>
      );
    }     
}  
export default Total;