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
    
    const [accountId, setAccountId] = useState(0);
    
    const showTransactions = (accountId) => {
        if(accountId == 0){
            return <Transactions transactions={transactions}/>
        }
        return <Transactions transactions={transactions.filter(t => t.accountId == accountId)}/>
    }
    
    const addTransactions = () => {
        var total = 0;
        
        for(var i = 0; i < transactions.length; i++){
            total += transactions[i].amount;
        }
        total = Math.round(total * 100)/100;
        return total;
    }
    
    return(
        <div>
            <TransactionsHeader setAccountId={setAccountId} total={addTransactions()}/>
            {showTransactions(accountId)}
        </div>
    )
}

export default Budget;