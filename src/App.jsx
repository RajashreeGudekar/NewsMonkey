import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <News pageSize={6} country="in" category="sports"/>
      </div>
    );
  }
}

export default App;
