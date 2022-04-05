import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios from "axios";

const Home = () => {
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
           <Transaction type={"Add Expense"} accounts={accounts} value={"negative"}/> 
        </div>
    )
}

export default Home;