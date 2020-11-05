import React, { Component } from 'react';
import './App.scss';
import Home from "../components/Home";

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        {/* // TODO GTB-知识点: - 这里使用<Home/> */}
        <Home></Home>
      </div>
    );
  }
}

export default App;
