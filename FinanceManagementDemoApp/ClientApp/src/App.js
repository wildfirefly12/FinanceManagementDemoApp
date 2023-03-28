import React, {useEffect, useState} from 'react';

import './custom.css'
import Home from "./components/home/Home";
import Navbar from "./components/nav-bar/NavBar"
import axios from "axios";
import {Route} from "react-router-dom";
import Accounts from "./components/accounts/Accounts";

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

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('/api/Account/Accounts', config)
            .then(response => {
                setAccounts(response.data);
            })
    }, []);
    

    return (
        <div style={{display: "flex", flexFlow: "row nowrap"}}>
            <Navbar/>
            <div style={{width: "100%"}}>
                <Route exact path={"/"}><Home transactions={transactions} accounts={accounts}/></Route>
                <Route path={"/budget"}></Route>
                <Route path={"/accounts"}><Accounts transactions={transactions} accounts={accounts}/></Route>
                <Route path={"/transactions"}></Route>
            </div>
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
