import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios from "axios";
import AtAGlance from "./AtAGlance";

const Home = (props) => {
    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('/api/Account/Accounts', config)
            .then(response => {
                setAccounts(response.data);
            })
    }, []);
    
    return (
        <div>
            <AtAGlance transactions={props.transactions}/>
            <Transaction type={"Add Expense"} accounts={accounts} value={"debit"}/>
            <Transaction type={"Add Income"} accounts={accounts} value={"credit"}/>
        </div>
    )
}

export default Home;