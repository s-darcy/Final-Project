import React, { Component } from 'react';
import _ from 'lodash';

class Total extends Component {

    render(){

      return (
            <tr className="total">
                <td>   ${this.props.totalPrice}.00</td>
                <td></td>
            </tr>
      );
    }     
}  
export default Total;