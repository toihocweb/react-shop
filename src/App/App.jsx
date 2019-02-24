import React, { Component } from 'react';
import './App.css';
import Category from '../components/ListAccounts/Category';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Header/Navbar';
class App extends Component {



  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar />
          <Category />
        </div>
        <Footer />
      </div>

    );
  }
}

export default App;
