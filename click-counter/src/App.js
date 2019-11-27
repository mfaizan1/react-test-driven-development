import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = { 
    counter: 0,
    belowZero : false
  }
  decrement = () => {
    if(this.state.counter === 0) {
      this.setState({belowZero: true})
    }else {
      this.setState({counter: this.state.counter-1});
    }
  }
  render(){
    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-text">Counter is {this.state.counter}</h1>
        <button data-test="increment-btn" onClick={()=> this.setState({counter: this.state.counter+1, belowZero: false})} >Increment</button>
        <button data-test="decreement-btn" onClick={()=> this.decrement()} >Decrement</button>
        <p data-test="error-p">{this.state.belowZero ? "Cannot go below zero": ''}</p>
      </div>
    )
  }
}

export default App;
