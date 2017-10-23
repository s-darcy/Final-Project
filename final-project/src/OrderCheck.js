import React, { Component } from 'react';

class OrderCheck extends Component {

    render(){

      return (

        <div>
            <p>Previous Order</p>
            <p>Your Order ID: <span className="orderID">{this.props.previousOrder.OrderID}</span></p>
            <p>Your Order Date: <span className="orderDate">{this.props.previousOrder.DateAdded}</span></p>
            <input className="ok" type="button" value="Ok" onClick={this.props.refreshPage}/>
            <button className="deleteOrder"
                onClick={this.props.deleteOrder}
            >Delete Order</button>
        </div> 
      );
    }     
}  
export default OrderCheck;