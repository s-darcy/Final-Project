import React, { Component } from 'react';

class SearchOrder extends Component {

    render(){

      return (
        <div className="previousOrder">
            <input type="text"
              placeholder="Order ID?"
              value =""
              onChange={this.props.handleTextChange}
            />
          </div> 
      );
    }     
}  
export default SearchOrder;