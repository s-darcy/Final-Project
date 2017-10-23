import React, { Component } from 'react';

class Total extends Component {

    render(){

        //(NOT WORKING)Calculates the total shopping cart for price and quantity
        let summingItUp = (a,b) => {
            return this.props.orderProducts.Price * this.props.quantityToOrder;
        }
        console.log(summingItUp); 

      return (
        <div>
            
        </div>
      );
    }     
}  
export default Total;