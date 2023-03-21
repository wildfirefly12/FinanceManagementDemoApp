import React, {Component, useEffect, useState} from 'react';

import './custom.css'
import Home from "./components/home/Home";
import axios from "axios";
import NavBar from "./components/nav-bar/NavBar";

const App = () => {

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/api/Transaction/Transactions', config)
            .then(response => {
                setTransactions(response.data);
            })
    }, []);

    return (
        <div style={{display: "flex", flexFlow: "row nowrap"}}>
            <NavBar/>
            <Home transactions={transactions} />
        </div>
    )
}

/*export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
        <div>
          <Home />
        </div>
    );
  }
}*/

export default App;
