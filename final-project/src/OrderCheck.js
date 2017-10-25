import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import EditProducts from './EditProducts';
import SelectNewProduct from './SelectNewProduct';

class OrderCheck extends Component {

    render(){

        let retrievedProduct = 
            <EditProducts
                editProducts={this.props.editProducts}
                handleChangeProductToggle={this.props.handleChangeProductToggle}
                editToggle={this.props.editToggle}
                productToggle={this.props.productToggle}
                handleEditRemove={this.props.handleEditRemove}
                removeSelectedItem={this.props.removeSelectedItem}
                changeProduct={this.props.changeProduct}
                availableProducts={this.props.availableProducts}
                handleQuantity={this.props.handleQuantity}
                submitEditQuantity={this.props.submitEditQuantity}
                handleEditQuantity={this.props.handleEditQuantity}
                editValue={this.props.editValue}
                value={this.props.value}
                submitEditProduct={this.props.submitEditProduct}
                handleEditProduct={this.props.handleEditProduct}
            /> 

      return (

        //Retrieved the previous Order ID and Date back from the DB to display to user
        //Offer to let the user delete an order from DB
        <div>
            <p className="previousOrder">Previous Order</p>
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
                onClick={(event) => {
                    this.props.pullSelectedProducts(event),
                    this.props.handleEditToggle(event)
                }}/>
            <button 
                className="deleteOrder"
                onClick={(event) => {
                    this.props.deleteOrder(event),
                    this.props.notifyingDeletion(event)
            }}>
            Delete Order</button>
            <div>
                {this.props.editToggle && retrievedProduct}
            </div>    
        </div> 
      );
    }     
}  
export default OrderCheck;
