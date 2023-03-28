import "./TransactionsList.css";

import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios, {Axios} from "axios";

const TransactionsList = (props) => {
    
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        axios.get("/api/Transactions", {
            params: {
                id: props.account,
                term: props.search
            },
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        }).then(response => {
            console.log(response.data)
            setTransactions(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [props.account, props.search]);
    
    return (
        <div className={"transactions"}>
            <div className={"transactionHeader"}>
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

export default TransactionsList;