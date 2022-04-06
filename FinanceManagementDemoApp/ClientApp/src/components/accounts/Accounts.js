import React, {useEffect, useState} from "react";

import Transactions from "./Transactions";
import TransactionsHeader from "./TransactionsHeader";
import axios from "axios";

const Accounts = (props) => {
    
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
    
    const [search, setSearch] = useState("");
    
    return(
        <div>
            <TransactionsHeader accounts={props.accounts} setAccountId={setAccountId} accountId={accountId} setSearch={setSearch} displayBalance={props.displayBalance}/>
            {showTransactions(accountId, search)}
        </div>
    )
}

export default Accounts;