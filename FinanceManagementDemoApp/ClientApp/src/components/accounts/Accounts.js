import React, {useEffect, useState} from "react";

import TransactionsHeader from "./TransactionsHeader";
import TransactionsList from "./TransactionsList";

const Accounts = (props) => {
    
    const [accountId, setAccountId] = useState(0);
    const [search, setSearch] = useState("");
    
    return(
        <div>
            <TransactionsHeader accounts={props.accounts} setAccountId={setAccountId} accountId={accountId} setSearch={setSearch}/>
            <TransactionsList account={accountId} search={search}/>
        </div>
    )
}

export default Accounts;