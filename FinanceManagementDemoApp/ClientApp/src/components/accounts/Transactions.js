import "./Transactions.css";

import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios from "axios";
import TransactionsHeader from "./TransactionsHeader";

const Transactions = () => {

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
    
    return (
        <div className={"transactions"}>
            <div className={"transactionsHeader"}>
                <p className={"descriptionHeader"}>Description</p>
                <p className={"dateHeader"}>Date</p>
                <p className={"amountHeader"}>Credit</p>
                <p className={"amountHeader"}>Debit</p>
            </div>
            {transactions.map(t => (
                <Transaction key={t.id} description={t.description} date={t.date} amount={t.amount} />
            ))}
        </div>
    )
}

export default Transactions;