import React, { Component } from 'react';

import './custom.css'
import Accounts from "./components/accounts/Accounts";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
          <Accounts />
        </div>
    );
  }
}
