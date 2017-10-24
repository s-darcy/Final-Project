import React, { Component } from 'react';

class OrderCheck extends Component {

    render(){

      return (

        //Retrieved the previous Order ID and Date back from the DB to display to user
        //Offer to let the user delete an order from DB
        <div>
            <p>Previous Order</p>
            <p>Your Order ID: <span className="orderID">{this.props.previousOrder.OrderID}</span></p>
            <p>Your Order Date: <span className="orderDate">{this.props.previousOrder.DateAdded}</span></p>
            <input className="ok" type="button" value="View Order" onClick={this.props.refreshPage}/>
            <button className="deleteOrder"
                onClick={this.props.deleteOrder}
            >Delete Order</button>
        </div> 
      );
    }     
}  
export default OrderCheck;