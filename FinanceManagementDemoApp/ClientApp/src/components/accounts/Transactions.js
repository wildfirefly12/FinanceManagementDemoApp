import "./Transactions.css";

import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios from "axios";
import TransactionsHeader from "./TransactionsHeader";

const Transactions = () => {
    
    return (
        <div className={"transactions"}>
            <div className={"transactionsHeader"}>
                <p className={"descriptionHeader"}>Description</p>
                <p className={"dateHeader"}>Date</p>
                <p className={"amountHeader"}>Credit</p>
                <p className={"amountHeader"}>Debit</p>
            </div>
            {props.transactions.map(t => (
                <Transaction key={t.id} description={t.description} date={t.date} amount={t.amount} />
            ))}
        </div>
    )
}

export default Transactions;