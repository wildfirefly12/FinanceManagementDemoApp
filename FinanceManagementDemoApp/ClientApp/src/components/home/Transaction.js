import "./Transaction.css";
import React from "react";

const Transaction = (props) => {
    
    
    
    return(
        <div className={"transactionForm"}>
            <h4>{props.type}</h4>
            <form>
                <p>Account</p>
                <input/>
                <p>Amount</p>
                <input/>
                <p>Date</p>
                <input/>
                <p>Description</p>
                <input/>
            </form>
        </div>
    )
}

export default Transaction;