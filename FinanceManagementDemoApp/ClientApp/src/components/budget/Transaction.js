import "./Transaction.css";

import React, {} from "react";

const Transaction = (props) => {
    
    const formatDate = (date) => {
        let newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();
        
        return month + "/" + day + "/" + year;
    }
    
    const showCredit = (transaction) => {
        if(transaction > 0){
            return transaction;
        }
    }

    const showDebit = (transaction) => {
        if(transaction < 0){
            return transaction;
        }
    }
    
    return (
        <>
            <div className={"transaction"}>
                <p className={"transactionDescription"}>{props.description}</p>
                <p className={"transactionDate"}>{formatDate(props.date)}</p>
                <p className={"transactionAmount"}>{showCredit(props.amount)}</p>
                <p className={"transactionAmount"}>{showDebit(props.amount)}</p>
            </div>
        </>
    )
}

export default Transaction;