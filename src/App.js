import React, { Component } from 'react';
import Input from './components/input'
import List from './components/list';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">todos</div>
        <div className="container">
          <br/>
          <Input />
          <List/>
        </div>
      </div>
    );
  }
}
