import React, {useEffect, useState} from "react";

import Transactions from "./Transactions";
import TransactionsHeader from "./TransactionsHeader";
import axios from "axios";

const Budget = () => {


    
    const [accountId, setAccountId] = useState(0);
    
    const showTransactions = (accountId, searchTerm) => {
        console.log("method called");
        let filteredTransactions = props.transactions.filter(t => t.accountId == accountId);
        
        if(search === ""){
            if(accountId == 0){
                return <Transactions transactions={props.transactions}/>
            }
            return <Transactions transactions={filteredTransactions}/>
        }
        console.log(filteredTransactions.filter(t => t.description.includes(searchTerm)));
        return <Transactions transactions={filteredTransactions.filter(t => t.description.contains(searchTerm))}/>
    }
    
    const addTransactions = () => {
        var total = 0;
        
        for(var i = 0; i < props.transactions.length; i++){
            total += props.transactions[i].amount;
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