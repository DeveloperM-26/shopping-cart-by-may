import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products: data.products,
      sizes: "",
      sort: ""
    }
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
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
            <Products products={this.state.products}></Products>
           </div>
           <div className="sidebar">Cart Items</div>
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
