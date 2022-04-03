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
    
    const showTransactions = (accountId, searchTerm) => {
        console.log("method called");
        let filteredTransactions = transactions.filter(t => t.accountId == accountId);
        
        if(search === ""){
            if(accountId == 0){
                return <Transactions transactions={transactions}/>
            }
            return <Transactions transactions={filteredTransactions}/>
        }
        console.log(filteredTransactions.filter(t => t.description.includes(searchTerm)));
        return <Transactions transactions={filteredTransactions.filter(t => t.description.contains(searchTerm))}/>
    }
    
    const addTransactions = () => {
        var total = 0;
        
        for(var i = 0; i < transactions.length; i++){
            total += transactions[i].amount;
        }
        total = Math.round(total * 100)/100;
        return total;
    }
    
    const [search, setSearch] = useState("");
    
    return(
        <div>
            <TransactionsHeader setAccountId={setAccountId} total={addTransactions()} setSearch={setSearch}/>
            {showTransactions(accountId, search)}
        </div>
    )
}

export default Budget;