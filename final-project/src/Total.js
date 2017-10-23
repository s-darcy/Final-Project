import React, { Component } from 'react';

class Total extends Component {

    render(){

        //(NOT WORKING)Calculates the total shopping cart for price and quantity
        let myTotal = 0;
        let summingItUp = (a,b) => {
            myTotal = this.props.orderPlaced[1] * this.props.orderPlaced[2];
        }
        console.log(summingItUp); 
        console.log(myTotal);

      return (
        <div>
            
        </div>
      );
    }     
}  
export default Total;