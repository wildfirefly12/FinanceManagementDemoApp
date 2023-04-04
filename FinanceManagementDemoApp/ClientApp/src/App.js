import React, {useEffect, useState} from 'react';

import './custom.css'
import Home from "./components/home/Home";
import Navbar from "./components/nav-bar/NavBar"
import axios from "axios";
import {Route} from "react-router-dom";
import Accounts from "./components/accounts/Accounts";
import Budget from "./components/budget/Budget";

const App = () => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }

    const formConfig ={
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/api/Transactions/Transactions', config)
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
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/Category', config)
            .then(response => {
                setCategories(response.data);
            })
    }, []);
    

    return (
        <div style={{display: "flex", flexFlow: "row nowrap"}}>
            <Navbar/>
            <div style={{width: "100%"}}>
                <Route exact path={"/"}><Home transactions={transactions} accounts={accounts} categories={categories} formConfig={formConfig}/></Route>
                <Route path={"/budget"}><Budget config={config}/></Route>
                <Route path={"/accounts"}><Accounts transactions={transactions} accounts={accounts}/></Route>
                <Route path={"/transactions"}><Accounts transactions={transactions} accounts={accounts}/></Route>
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
