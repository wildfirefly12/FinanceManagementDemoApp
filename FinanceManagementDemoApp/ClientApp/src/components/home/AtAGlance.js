import "./AtAGlance.css";

import React from "react";

const AtAGlance = (props) => {
    
    const date = new Date();
    const today = (date.getMonth()+1)+ "/" + date.getDate() + "/" + date.getFullYear();
    
    const addTransactions = () => {
        var total = 0;

        for(var i = 0; i < props.transactions.length; i++){
            total += props.transactions[i].amount;
        }
        total = Math.round(total * 100)/100;
        return total;
    }
    
    return (
        <div className={"atAGlance"}>
            <h3>{today}</h3>
            <h3>{addTransactions()}</h3>
        </div>
    )
}

export default AtAGlance;