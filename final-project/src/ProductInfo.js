import React, { Component } from 'react';

class ProductInfo extends Component {

    render(){

      return (
        <div key={this.props.product.ProductID}>
        <button name={this.props.product.Name} onClick={this.handleProducts}>
          <h3>{this.props.product.Name}</h3>
          <img alt={this.props.product.Name} src={process.env.PUBLIC_URL + this.props.product.Images} /> 
          <p>{this.props.product.Description}</p>
          <p>${this.props.product.Price}.00</p>
          <form name="myForm" onSubmit={this.handleSubmit}>
              <label>
                Select the number of beer taps that you would like to order:
                <select value={this.props.value} onChange={this.props.handleQuantity}>
                  <option value="0">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>  
              <input type="submit" value="Submit" />
          </form> 
          </button> 
        </div>
      );
    }     
}  

export default ProductInfo;