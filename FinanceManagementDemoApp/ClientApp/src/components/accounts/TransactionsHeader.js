import "./TransactionsHeader.css";

import React, {useEffect, useState} from "react";
import axios from "axios";

const TransactionsHeader = (props) => {
    
    const handleChooseAccount = (event) => {
        props.setAccountId(event.target.value);
        console.log(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        props.setSearch(event.target.value);
    }
    
    return(
        <div className={"transactionsHeader"}>
            <input className={"transactionSearch"} type={"text"} onChange={handleSearch}/>
            <h3 className={"total"}>${}</h3>
            <form>
                <select className={"transactionSearch"} onChange={handleChooseAccount}>
                    <option value={0}>All Accounts</option>
                    {props.accounts.map(a => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default TransactionsHeader;