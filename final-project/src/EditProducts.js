import React, { Component } from 'react';

class EditProducts extends Component {

    render(){

        return (
            <div>
                <table style={table}>
                    <table className="innerTables headerName">
                        <thead>
                        <tr>
                            <th>Tap Handle Name</th>
                        </tr>  
                    </thead>
                    <tbody>       
                        <tr>
                        
                        </tr>
                    </tbody>
                    </table>
                    <table className="innerTables headerPrice">
                        <thead>
                        <tr>
                            <th>Price</th>
                        </tr>
                        </thead> 
                        <tbody>
                        <tr>
                            
                        </tr>
                        </tbody>   
                    </table>
                    <table className="innerTables headerQty">
                        <thead>
                        <tr>
                            <th>Qty</th>
                        </tr>
                        </thead> 
                        <tbody>
                        <tr>
                            
                        </tr>
                        </tbody> 
                    </table>      
                </table>             
            </div> 
        );
    }     
}  
export default EditProducts;