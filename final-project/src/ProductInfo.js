import React, { Component } from 'react';

class ProductInfo extends Component {
    render(){
      return (
        <div key={this.props.product.ProductID}>
          <h3 >{this.props.product.Name}</h3>
          <p>{this.props.product.Description}</p>
          <p>${this.props.product.Price}.00</p> 
        </div>
      );
    }     
}  

export default ProductInfo;