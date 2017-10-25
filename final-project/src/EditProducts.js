import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';

class EditProducts extends Component {

    render(){
        // var table = {width: '100%'};
        
        return (
            <div className="editProductsWrapper">
                <ToggleDisplay show={!this.props.handleEditToggle}>
                </ToggleDisplay> 
                <ToggleDisplay if={this.props.handleEditToggle} tag="section">
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
                                    <td key={i} className="cartItems tdDelete1Item">
                                        {editProduct.Quantity}
                                        <button className="edit1Item">
                                            Edit
                                        </button>  
                                        <button 
                                            value={editProduct.SelectedProductsID} 
                                            className="delete1Item" 
                                            onClick={(event)=>{
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
            </div> 
        );
    }     
}  
export default EditProducts;