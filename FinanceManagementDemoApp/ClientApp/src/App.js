import React, { Component } from 'react';

import './custom.css'
import Home from "./components/home/Home";


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
          <Home />
        </div>
    );
  }
}
