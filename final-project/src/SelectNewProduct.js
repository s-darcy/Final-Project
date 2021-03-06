import React, { Component } from 'react';


class SelectNewProduct extends Component {

    render(){

      return (
        <div>
            <table className="editProductsTable">
                <table className="innerTables headerNameMobile headerName">
                    <thead>
                        <tr>
                            <th>Select New Tap Handle To Replace</th>
                        </tr>  
                    </thead>
                    <tbody>       
                        <tr>
                            <td className="cartItems">
                                <select 
                                    className="newProductToSelect" 
                                     
                                    value={this.props.productName}
                                    onChange={this.props.handleEditProduct}>
                                        {this.props.availableProducts.map((product, i) => 
                                            <option key={i} name={product.Name} value={product.ProductID}>
                                                {product.Name}
                                            </option>
                                        )}
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
                            <td >
                                <select 
                                    className="newProductToSelect"
                                    value={this.props.value} 
                                    id="quantitySelected" 
                                    onChange={this.props.handleEditQuantity}>
                                        <option value="0">--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>   
                </table>
                <table className="innerTables headerPriceMobile  headerPrice">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody>
                        <tr>
                        
                            <td className="eraseButtons">
                            {this.props.editProducts.map((editProduct, i) => 
                                <button 
                                    className="saveChanges  newProductToSelect"
                                    onClick={(event) => {
                                        this.props.submitEditQuantity(event),
                                        this.props.submitEditProduct(event),
                                        this.props.editOrder(event),
                                        this.props.updateByRemovingOneItem(event),
                                        this.props.handleEditRemove(editProduct.SelectedProductsID, event) 
                                    }}
                                >Save</button>
                                 )}
                            </td>
                           
                        </tr>
                    </tbody>   
                </table>
            </table>             
        </div>    
      );
    }     
}  
export default SelectNewProduct;