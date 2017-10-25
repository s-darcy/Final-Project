import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import SelectNewProduct from './SelectNewProduct';

class EditProducts extends Component {


    render(){
        
        let newlySelectedProduct = 
            <SelectNewProduct
                availableProducts={this.props.availableProducts}
                handleQuantity={this.props.handleQuantity}
                submitEditQuantity={this.props.submitEditQuantity}
                handleEditQuantity={this.props.handleEditQuantity}
                editValue={this.props.editValue}
                value={this.props.value}
            /> 
        
        return (
            <div className="editProductsWrapper">
                <table className="editProductsTable">
                    <table className="innerTables headerNameMobile headerName">
                        <thead>
                            <tr>
                                <th>Tap Handle Name</th>
                            </tr>  
                        </thead>
                    <tbody>       
                        <tr>
                            {this.props.editProducts.map((editProduct, i) => <td key={i} className="cartItems">{editProduct.Name}</td>)}
                        </tr>
                    </tbody>
                    </table>
                    <table className="innerTables headerPriceMobile  headerPrice">
                        <thead>
                            <tr>
                                <th>Price</th>
                            </tr>
                        </thead> 
                        <tbody>
                            <tr>
                                {this.props.editProducts.map((editProduct, i) => <td key={i} className="cartItems">{editProduct.Price}</td>)}
                            </tr>
                        </tbody>   
                    </table>
                    <table className="innerTables headerQtyMobile headerQty">
                        <thead>
                            <tr>
                                <th>Qty</th>
                            </tr>
                        </thead> 
                        <tbody>
                            <tr>
                                {this.props.editProducts.map((editProduct, i) => 
                                    <td 
                                        key={i} 
                                        className="cartItems tdDelete1Item"
                                    >
                                        {editProduct.Quantity}
                                        <button 
                                            className="edit1Item"
                                            onClick={(event) => {
                                                this.props.changeProduct(event),
                                                this.props.handleChangeProductToggle(event)
                                            }}>
                                            Edit
                                        </button>  
                                        <button 
                                            value={editProduct.SelectedProductsID} 
                                            className="delete1Item" 
                                            onClick={(event) => {
                                                this.props.removeSelectedItem(editProduct.SelectedProductsID, event),
                                                this.props.handleEditRemove(editProduct.SelectedProductsID, event)
                                        }}>
                                        Remove</button>
                                    </td>
                                )}
                            </tr>
                        </tbody> 
                    </table>
                </table> 
                {this.props.productToggle && newlySelectedProduct}              
    
            </div> 
        );
    }     
}  
export default EditProducts;