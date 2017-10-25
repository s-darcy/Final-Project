import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';

class EditProducts extends Component {

    render(){
        // var table = {width: '100%'};
        
        return (
            <div className="editProductsWrapper">
                <ToggleDisplay show={!this.props.editToggle}>
                </ToggleDisplay> 
                <ToggleDisplay if={this.props.editToggle} tag="section">
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
                                                this.props.handleEditToggle(event)
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
                </ToggleDisplay>
                <ToggleDisplay show={!this.props.productToggle}>
                </ToggleDisplay>
                <ToggleDisplay if={this.props.productToggle} tag="section"> 
                <table className="editProductsTable">
                    <table className="innerTables headerNameMobile headerName">
                        <thead>
                            <tr>
                                <th>Select New Tap Handle</th>
                            </tr>  
                        </thead>
                        <tbody>       
                            <tr>
                                <td className="cartItems">
                                    <select value={this.props.value} onChange={this.props.handleQuantity}>
                                        {this.props.availableProducts.map((availableProducts, i) => {
                                            <option value={this.props.availableProducts.ProductID}>
                                                {this.props.availableProducts.Name}
                                            </option>
                                        })}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="innerTables headerPriceMobile  headerPrice">
                        <thead>
                            <tr>
                                <th>Select New Quantity</th>
                            </tr>
                        </thead> 
                        <tbody>
                            <tr>
                                <select value={this.props.value} onChange={this.props.handleQuantity}>
                                    <option value="0">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </tr>
                        </tbody>   
                    </table>
                </table>
                </ToggleDisplay>                
            </div> 
        );
    }     
}  
export default EditProducts;