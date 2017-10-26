import React, { Component } from 'react';
import './App.css';
import superagent from 'superagent';
import _ from 'lodash';
import ProductInfo from './ProductInfo';
import Total from './Total'; 
import ThankYou from './ThankYou';
import OrderCheck from './OrderCheck';
import EditProducts from './EditProducts';
import SelectNewProduct from './SelectNewProduct';

class App extends Component {

  constructor() {
    super();
    this.state = {

      //State for server 
      availableProducts : [], //Store all products on initial render
      orderPlaced : [],
      selectedProducts : [],
      insertUpdatedProducts :[],
      orderProducts : [],
      editProducts : [],
      previousOrder : [],
      itemToRemove : [],
    
      //React arrays for storing state for render purposes only
      customerID : [],
      thankYou : false,
      show : false, //deleted Message
      editToggle : false,
      productToggle : false,
      products : [],
      price : [],
      quantity : [],
      editQuantity : [],
      quantityHandled : [],
      quantityEditHandled : [],
      editSelectedProduct : [],
      editProductHandled : [],
      idText : [],
      updateProduct : [],
      value : '',
      editValue : '',
      searchIDText : '',
      totalPrice : '',
      productName : '',

      title: 'The Tap Handle'
    };

    //Functions Binding to State
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.submitQuantity = this.submitQuantity.bind(this);
    this.handleProducts = this.handleProducts.bind(this);
    this.submitOrderID = this.submitOrderID.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    this.submitOrdertoDB = this.submitOrdertoDB.bind(this);
    this.storeOrderDetails = this.storeOrderDetails.bind(this);
    this.handleThankYou = this.handleThankYou.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleChangeProductToggle = this.handleChangeProductToggle.bind(this);
    this.handleSearchIDTextChange = this.handleSearchIDTextChange.bind(this);
    this.handleSearchIDTextSubmit = this.handleSearchIDTextSubmit.bind(this);
    this.findOrder = this.findOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.notifyingDeletion = this.notifyingDeletion.bind(this);
    this.pullSelectedProducts= this.pullSelectedProducts.bind(this);
    this.editOrder = this.editOrder.bind(this);
    this.handleEditRemove = this.handleEditRemove.bind(this);
    this.removeSelectedItem = this.removeSelectedItem.bind(this);
    this.handleEditQuantity = this.handleEditQuantity.bind(this);
    this.submitEditQuantity = this.submitEditQuantity.bind(this);
    this.submitEditProduct = this.submitEditProduct.bind(this);
    this.handleEditProduct= this.handleEditProduct.bind(this);
    this.editOrder = this.editOrder.bind(this);
     
    //Calls all the Product details on initial render
    this.fetchProducts();
  } // End of Consturctor

  //----------------------------------------------------------//
  //------------------React Functionality--------------------//
  //--------------------------------------------------------//

  //This function stores the whole order details (CustomerID, Quantity, Prices, ProductID)
  storeOrderDetails (event) {
    event.preventDefault();

    //CustomerID
    let customerID = this.state.customerID;
    //Prices
    let prices = this.state.price.slice();
    //ProductIDs  
    let productID = this.state.selectedProducts.slice();
    //Quantity
    let quantity = this.state.quantity.slice();
    this.state.orderPlaced.push([customerID, quantity, prices, productID]);
    this.setState({
      orderPlaced: [customerID, quantity, prices, productID]
    });
  }

  //Stores the productID only for the Order Submitted
  submitOrderID (event) {
    event.preventDefault();
    let productSubmitted = event.target.value;

    this.state.selectedProducts.push(productSubmitted);
    this.setState({
      value: productSubmitted
    });
  }

  //It's finding the selected product from all of our products in state
  submitOrder (product, event) {
    event.preventDefault();

    let originalProducts = this.state.availableProducts.slice();
    let findProduct = originalProducts.find((original) => {
      if (original.ProductID == product){
        return original;
      };
    });

    this.state.orderProducts.push(findProduct);
    this.setState({
      value: findProduct
    });

    //Calculating Total Cost
    let multiplyPrice = this.state.price.map((price) => {
      return price;
    });
    let multiplyQuantity = this.state.quantity.map((quantity)=>{
      return quantity;
    });
    let combined = multiplyPrice.map((a, i) => a * multiplyQuantity[i]);
    let summingCombinedArray = _.sum(combined);

    //Storing Total as an Object in State
    let newTotal = Object.assign({}, this.state.totalPrice);
    newTotal = summingCombinedArray ;
    this.setState({
      "totalPrice" : newTotal
    });
  }

  //----------------------------------------------------------------//
  //-----------------Handling Select Functionality-----------------//
  //--------------------------------------------------------------//

  //Helps the quantity select drop down
  handleQuantity (event) {
    event.preventDefault();
    let quantitySelected = event.target.value;
    console.log(quantitySelected);

    this.state.quantityHandled.push(quantitySelected);
    this.setState({
      value: quantitySelected
    });
  } 
  
  //Quantity that renders in the shopping cart
  submitQuantity (event) {
    event.preventDefault();
    let submittedQuantity = this.state.value;

    this.state.quantity.push(submittedQuantity);
    this.setState({
      value: submittedQuantity 
    });
  }

  //Helps the quantity Edited select drop down
  handleEditQuantity (event) {
    event.preventDefault();
    let quantityEditSelected = event.target.value;

    this.state.quantityEditHandled.push(quantityEditSelected);
    this.setState({
      value: quantityEditSelected
    });
  } 

  //Stores the Quantity for the Edited Product
  submitEditQuantity (event) {
    event.preventDefault();
    let submittedEditQuantity = this.state.value;

    this.state.editQuantity.push(submittedEditQuantity);
    this.setState({
      value: submittedEditQuantity 
    });
  }

   //Helps the quantity select drop down
   handleEditProduct (event) {
    event.preventDefault();

    let newProductSelected = event.target.value;
    console.log(newProductSelected );

    this.state.editProductHandled.push(newProductSelected);
    this.setState({
      value: newProductSelected
    });
  } 
  
  //Quantity that renders in the shopping cart
  submitEditProduct (event) {
    event.preventDefault();
    let submittedNewProduct = this.state.value;
    console.log(submittedNewProduct);

    this.state.editSelectedProduct.push(submittedNewProduct);
    this.setState({
      value: submittedNewProduct
    });

  }

  //Renders the product and the price in the shopping cart
  handleProducts(event) {
    event.preventDefault();

    //Handles products name, which allows it to show in the shopping cart
    let productSelected = event.target.name;
    this.state.products.push(productSelected);
    this.setState({
      value: productSelected 
    });
    
    //Handles the price, which allows it to show in the shopping cart
    let priceSelected = event.target.id;
    this.state.price.push(priceSelected);
    this.setState({
      value: priceSelected 
    });
  }

  //Empties the shopping cart by setting all the array lengths back to 0
  emptyCart(event) {
    let orderProducts = this.state.orderProducts;
    
    console.log(orderProducts);
    let empty = orderProducts.length = 0;

    this.setState({
      orderProducts : empty
    });
  }

  //Clears pending shopping cart with a window refresh
  refreshPage() {
    window.location.reload();
  } 

  //Removes the one products from state and uploads a new array
  handleEditRemove(product, event) {
    event.preventDefault();

    let orginalArray = this.state.editProducts.slice();
    console.log(orginalArray);

    //Target the editProducts table
    let curEditProduct = orginalArray.find((original) => {
      if (original.SelectedProductsID == product){
        return original.SelectedProductsID;
      };
    });
    console.log(curEditProduct);

    //Lodash to remove certain object in array
    let newArray = _.pull(orginalArray, curEditProduct)
    console.log(newArray);

    this.state.editProducts.push(newArray);
    this.setState({
      editProducts : newArray 
    });
  }

  //Handles the Changing Input text into the Search fields
  handleSearchIDTextChange(event) {
    const newSearch = event.target.value;
    let text = Object.assign({}, this.state.searchIDText);
    text = newSearch;
    
    this.setState({
        "searchIDText" : text
    });
  }

  //Handles the Submission of the Input text into the Search fields and store it in state
  handleSearchIDTextSubmit(event){
    event.preventDefault();
    let searchID = event.target.searchIDText;

    //Clears the Input Field
    var IDInput = document.getElementById("IDInput");
    IDInput.reset();
  }

  //-------------------------------------------------------------//
  //-----------------Toggle Display Functionality---------------//
  //-----------------------------------------------------------//

  //Thank You Message State
  handleThankYou() {
    this.setState({
      thankYou : !this.state.thankYou
    });
  }

    //Edit Table State
    handleEditToggle() {
      this.setState({
        editToggle : !this.state.editToggle
      });
    }

    //Toggles the newly selected products
    handleChangeProductToggle(){
      this.setState({
        productToggle : !this.state.productToggle
      });
    }

    //Deleted Order has text added stating "This Order is now deleted"
    notifyingDeletion(event) {
      this.setState({
        show : !this.state.show
      });
    }

  //----------------------------------------------------------//
  //-----------------CRUD/Server Functionality---------------//
  //--------------------------------------------------------//

  //Pulls in all of our products on initial render
  fetchProducts () {
    superagent.get('http://localhost:5000/products')
    .then((res) => {
      this.setState({
        availableProducts: res.body
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }; 

  //Submits an Order to the Orders table
  submitOrdertoDB (product, event) {

    //Quantity mapping to Object
    let quantitySelected = this.state.quantity.map((quantity)=>{
      return {"quantity" : quantity};
    });
    //Product IDs mapping to Object
    let orderProductID = this.state.orderProducts.map((orderProducts) => {
      return {"productID" : orderProducts.ProductID};
    });
    //Lodash merges the two arrays into one Object
    let mergedQuantityProduct = _.merge(quantitySelected, orderProductID);
    console.log(mergedQuantityProduct);

    //Adding the products to the Server with POST request
    let requestObject = {
      "selectedProducts" : mergedQuantityProduct
    }
    superagent.post('http://localhost:5000/addPost')
    .send(requestObject)
    .then(
      (res) => {
        this.setState({
          customerID: res.body.orderID
        });
      }
    );
  }

  //Finds specific submitted order by OrderID
  findOrder (event) {
    event.preventDefault();
    let searchedID = this.state.searchIDText;

    superagent.get(`http://localhost:5000/getpost/${searchedID}`)
    .send(searchedID)
    .then(

      // Store the response in an array for PreviousOrder 
      //so I can use React to ask if they want to Delete or Edit
      (res) => {
        console.log(res.status, res.body.orderID);
        this.setState({
          previousOrder: res.body
        });
      }
    );
  }

  //Deletes the order from the database when "Delete Order" is pushed
  deleteOrder (event) {
    event.preventDefault();
    let searchedID = this.state.searchIDText;

    superagent.delete(`http://localhost:5000/deletepost/${searchedID}`)
    .send(searchedID)
    .then(
      (res) => {
        console.log(res.status);
      }
    );
  }

  //Retrieves selected products from previous order so we can edit them
  pullSelectedProducts (event) {
    event.preventDefault();
    let searchedID = this.state.searchIDText;

    superagent.get(`http://localhost:5000/selectedproducts/${searchedID}`)
    .send(searchedID)
    .then(
      (res) => {
        console.log(res.status, res.body);

        this.state.editProducts.push(res.body);
        this.setState({
          editProducts : res.body
        });
      }
    );
  }

  //Removes one Item from SelectedProducts Table
  removeSelectedItem (SelectedProductsID, event) {
    event.preventDefault();

    superagent.delete(`http://localhost:5000/removeproduct/${SelectedProductsID}`)
    .send(SelectedProductsID)
    .then(
      (res) => {
        console.log(res.status, res.body);

        this.state.editProducts.push(res.body);
        console.log(res.body);
      }
    );
  }

  //Edits an Order in DB by Adding a newly Selected Product to Order
  editOrder (event) {
    event.preventDefault();

    //Grabbing the productID from the selected product
    let theEditedProductName = this.state.editProductHandled.map((productID)=>{
      return {"productID" : productID};
    });
    
    //Product IDs mapping to Object
    let theEditedQuantity = this.state.editQuantity.map((quantity) => {
      return {"quantity" : quantity};
    });

    //OrderID from current Order to bundle up with newly selected product
    let previousOrderID = this.state.previousOrder.map((previous) => {
      return {"OrderID" : previous.OrderID};
    });

    //Lodash merges the two arrays into one Object
    let mergeNewlySelectedProduct = _.merge(theEditedProductName, theEditedQuantity, previousOrderID);
    console.log(mergeNewlySelectedProduct);

    //Push the newly merged product into State
    this.state.updateProduct.push(mergeNewlySelectedProduct);
    this.setState({
      value: mergeNewlySelectedProduct
    });

    //Sending new product to the server
    let newProductToAddDetails = {
      "selectedProducts" : mergeNewlySelectedProduct
    }

    // superagent.post(`http://localhost:5000/updateproduct`)
    // .send(mergeNewlySelectedProduct)
    // .then(
    //   (res) => {
    //     this.setState({
    //       customerID: res.body.orderID
    //     });
    //   }
    // );
  }

  //----------------------------------------------------------//
  //-----------------Render Page Functionality---------------//
  //--------------------------------------------------------//

//This is the <App /> Render
  render() {
    var table = {width: '100%'};
    
    //Setting State in Render 
    let title = this.state.title;
    let quantity = this.state.quantity;
    let products = this.state.products;
    let price = this.state.price;
    let customerID = this.state.customerID;
    let totalPrice = this.state.totalPrice;
    let show = this.state.show;
    let editToggle = this.state.editToggle;
    let productToggle = this.state.productToggle;

    //Renders the shopping cart total
    let cost =
        <Total
          totalPrice={totalPrice}
        />

    //Injects the Thank You Component
    let thankYouMessage =
        <ThankYou
          customerID={this.state.customerID}
      />  

    //Main Component that render to page on refresh
    let eachProduct = 
      this.state.availableProducts.map((availableProducts, i) => {
        return (
          <ProductInfo
            key={i}
            product={availableProducts}
            quantity={this.quantity}
            quantityHandled={this.quantityHandled}
            value={this.state.value}
            handleQuantity={this.handleQuantity}
            handleProducts={this.handleProducts}
            submitQuantity={this.submitQuantity}
            submitOrderID={this.submitOrderID}
            submitOrder={this.submitOrder}
          /> 
        );
      }, this);
    
    //After Order ID Requested for DB, rendering Delete Option to the page
    let foundPreviousOrder = 
      this.state.previousOrder.map((previousOrder, i) => {
        return (
          <OrderCheck
            previousOrder={previousOrder}
            refreshPage={this.refreshPage}
            deleteOrder={this.deleteOrder}
            pullSelectedProducts={this.pullSelectedProducts}
            editOrder={this.editOrder}
            notifyingDeletion={this.notifyingDeletion}
            editProducts={this.state.editProducts}
            handleEditRemove={this.handleEditRemove}
            removeSelectedItem={this.removeSelectedItem}
            show={show}
            editToggle={editToggle}
            productToggle={productToggle}
            changeProduct={this.changeProduct}
            availableProducts={this.state.availableProducts}
            handleQuantity={this.handleQuantity}
            handleEditToggle={this.handleEditToggle}
            handleChangeProductToggle={this.handleChangeProductToggle}
            submitEditQuantity={this.submitEditQuantity}
            handleEditQuantity={this.handleEditQuantity}
            editValue={this.state.editValue}
            value={this.state.value}
            submitEditProduct={this.submitEditProduct}
            handleEditProduct={this.handleEditProduct}
            productName={this.props.productName}
          /> 
        );
      }, this);

    return (
      <div className="App">
        <h1>{title}</h1>
        <div className="wrapper">
          <section className="searchOrder">
            <div className="findOrder">
              <p>Would you like to edit or delete a previous order?</p>
              <form id="IDInput">
                <input 
                  type="text"
                  placeholder="Order ID?"
                  value={this.searchIDText}
                  onChange={this.handleSearchIDTextChange}
                />
                <img className="magnifyingGlass" src="img/magnifying_glass.PNG" alt="magnifying glass icon" />
                <button
                  className="find"
                  type="submit" 
                  onClick={(event) => {
                    this.handleSearchIDTextSubmit(event),
                    this.findOrder(event)
                  }}><span>Find</span></button>
              </form>
              {foundPreviousOrder}      
            </div>
          </section>    
          <div className="shoppingCart">
            <h3>Your Cart
              <img className="theCart" alt="shopping cart icon" src="/img/shopping-cart.PNG" />
            </h3>
            <table style={table}>
              <table className="innerTables headerName">
                <thead>
                  <tr>
                    <th>Tap Handle Name</th>
                  </tr>  
              </thead>
              <tbody>       
                  <tr>
                    {products.map((productSelected, i) => <td key={i} className="cartItems">{productSelected}</td>)}
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
                    {price.map((priceSelected, i) => <td key={i} className="cartItems">${priceSelected}.00</td>)}     
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
                    {quantity.map((quantityToSubmit, i) => <td key={i} className="cartItems">{quantityToSubmit}</td>)}   
                  </tr>
                </tbody>   
              </table>             
              <tfoot>
              <button type="submit" className="submitCart" onClick={(event) => {
                this.handleThankYou(event),
                this.submitOrdertoDB(event),
                this.storeOrderDetails(event)
              }}>
              Place Order </button>   
              <input 
                type="button" 
                value="Clear Cart"
                className="emptyCart"  
                onClick={this.refreshPage}/>
                {cost}
              </tfoot>   
            </table>
            <div>
              {this.state.thankYou && thankYouMessage}
            </div>
          </div>
          <div className="products"> 
            {eachProduct}
          </div>
          <footer>
            <p>&copy; 2017<script>new Date().getFullYear()>2010&&document.write("-"+new Date().getFullYear());</script>, {this.state.title}</p>
          </footer>  
        </div>
      </div>   
      )
    }

} //Closes the app

export default App;
