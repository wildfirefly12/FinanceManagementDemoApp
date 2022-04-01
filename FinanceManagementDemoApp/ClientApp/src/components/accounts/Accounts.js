import React, {useEffect, useState} from "react";

import Transactions from "./Transactions";
import TransactionsHeader from "./TransactionsHeader";
import axios from "axios";

const Budget = () => {

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
    
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    
    const [accountId, setAccountId] = useState();
    
    const showTransactions = (accountId) => {
               
        if(accountId == null){
            return <Transactions transactions={transactions} />
        }
        return <Transactions transactions={filteredTransactions}/>
    }
    
    return(
        <div>
            <TransactionsHeader setAccountId={setAccountId}/>
        </div>
    )
}

export default Budget;