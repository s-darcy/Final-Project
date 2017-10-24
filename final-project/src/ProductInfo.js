import React, { Component } from 'react';
// import EditProducts from './EditProducts';

class ProductInfo extends Component {

  render(){
    let isQuantitySelected = this.props.quantityHandled;
    // console.log(isQuantitySelected);

    return (
      <div className="individualContainer" key={this.props.product.ProductID}>
        <h2>{this.props.product.Name}</h2>
        <img className="beerTapPics" alt={this.props.product.Name} src={process.env.PUBLIC_URL + this.props.product.Images} /> 
        <p className="description">{this.props.product.Description}</p>
        <div className="addingToCart">
          <p className="price">${this.props.product.Price}.00</p>
              Qty:
              <select value={this.props.value} onChange={this.props.handleQuantity}>
                <option value="0">--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            <div>
              <button
                className="addProduct"
                name={this.props.product.Name}
                id={this.props.product.Price}
                value={this.props.product.ProductID} 
                onClick={(event) => { 
                    this.props.handleProducts(event),
                    this.props.submitQuantity(event),
                    this.props.submitOrderID(event),
                    this.props.submitOrder(this.props.product.ProductID, event)
                }}>
              Add to Cart</button>    
            </div>  
          </div>
        </div>
      );
    }     
  }  
export default ProductInfo;