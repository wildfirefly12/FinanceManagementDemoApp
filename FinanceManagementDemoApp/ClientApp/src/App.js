import React, { Component } from 'react';

import './custom.css'
import Budget from "./components/budget/Budget";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
          <Budget />
        </div>
    );
  }
}
