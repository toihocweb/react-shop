import React, { Component } from 'react';
import './App.css';
import Navbar from '../components/Header/Navbar';
import Category from '../components/ListAccounts/Category';
import Footer from '../components/Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
            <Category />
          </div>
          <Footer />
      </div>
      
    );
  }
}

export default App;
