import React, { Component } from 'react';
import './App.scss';
import Home from "../components/Home";

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
       
        <Home />
      </div>
    );
  }
}

export default App;
