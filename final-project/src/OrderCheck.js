import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import EditProducts from './EditProducts';

class OrderCheck extends Component {

    render(){

        let retrievedProduct = 
            this.props.editProducts.map((editProducts, i) => {
            return (
                <EditProducts
                    editProducts={this.props.editProducts}
                /> 
            );
        }, this);

      return (

        //Retrieved the previous Order ID and Date back from the DB to display to user
        //Offer to let the user delete an order from DB
        <div>
            <p>Previous Order</p>
            <p>Your Order ID: <span className="orderID">{this.props.previousOrder.OrderID}</span></p>
            <ToggleDisplay show={!this.props.show}>
                <p>Your Order Date: <span className="orderDate">{this.props.previousOrder.DateAdded}</span></p>
            </ToggleDisplay>
            <ToggleDisplay if={this.props.show} tag="section" className="orderDeleted">
               <p >Your Order Has Been Deleted</p>
            </ToggleDisplay> 
            <input 
                className="ok" 
                type="button" 
                value="Edit Order" 
                onClick={this.props.pullSelectedProducts}
            />
            <button 
                className="deleteOrder"
                onClick={(event) => {
                this.props.deleteOrder(event),
                this.props.notifyingDeletion(event)
                }}>
            Delete Order</button>
            <div>
                {retrievedProduct}
            </div>    
        </div> 
      );
    }     
}  
export default OrderCheck;