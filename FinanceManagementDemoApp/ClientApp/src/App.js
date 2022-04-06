import React, {Component, useEffect, useState} from 'react';

import './custom.css'
import Home from "./components/home/Home";
import axios from "axios";
import {BrowserRouter, Route, Router} from "react-router-dom";
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
    },[]);

    const displayBalance = (accounts, accountId) => {
        if(accountId == 0){
            let total = 0;
            for(let i = 0; i < accounts.length; i++){
                total += accounts[i].balance;
            }
            return total;
        } else {
            for(let i = 0; i < accounts.length; i++){
                if(accounts[i].id == accountId){
                    return accounts[i].balance;
                }
            }
        }
    }
    

    return (
        <div>
            <BrowserRouter>
                <Route path={"/accounts"}><Accounts accounts={accounts} transactions={transactions} displayBalance={displayBalance}/></Route>
            </BrowserRouter>
            <Home transactions={transactions} accounts={accounts} displayBalance={displayBalance}/>
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
