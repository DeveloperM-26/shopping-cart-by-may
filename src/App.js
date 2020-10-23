import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [],
      sizes: "",
      sort: "",
    }
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  filterProducts = (event) => {
    if(event.target.value === ""){
      this.setState({
        size: event.target.value,
        products: data.products
      })
    }else{
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          product => product.availableSizes.indexOf(event.target.value) >= 0
        )
      })
    }
  }
  sortProducts(event){
    const sort = event.target.value;
    this.setState({
      sort,
      products: this.state.products.slice().sort((a, b) =>( // use slice() for a new array object.
        sort === "lowest" ?
        ((a.price > b.price) ? 1: -1):
        sort === "highest" ?
        ((a.price < b.price) ? 1: -1):
        ((a._id < b._id) ? 1: -1)
      ))
    })
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    })
    if(!alreadyInCart){
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x=> x._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=> x._id !== product._id)))
  }
  createOrder = (order) => {
    alert( "Need to save order for " + order.name )
  }
  render(){
    return (
      <div className="grid-container">
        <header className="App-header">
          <a
            className="App-link"
            href="/"
            target="_blank"
          >
            Shopping Cart By May
          </a>
        </header>
        <main>
         <div className="content">
           <div className="main">
            <Filter 
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              >
            </Filter>
            <Products products={this.state.products} addToCart={this.addToCart}></Products>
           </div>
           <div className="sidebar">
              <Cart 
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              ></Cart>
           </div>
         </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
 
}

export default App;
