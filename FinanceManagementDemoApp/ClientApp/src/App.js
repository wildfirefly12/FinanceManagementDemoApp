import React, { Component } from 'react';

import './custom.css'
import LandingPage from "./components/landing-page/LandingPage";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
          <LandingPage/>
        </div>
    );
  }
}
