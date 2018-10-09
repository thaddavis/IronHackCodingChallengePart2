import React, { Component } from 'react';
import './App.scss'

import Router from '../routes/Router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App
