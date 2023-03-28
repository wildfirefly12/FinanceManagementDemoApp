import "./AccountsOverview.css";

import React from "react";
import AccountCard from "./AccountCard";
import HorizontalScroll from "react-horizontal-scrolling";

const AccountsOverview = (props) => {
    
    
    
    return(
        <HorizontalScroll className={"accounts-overview-container"}>
            {props.accounts.map((account, i) => 
                <AccountCard index={i} title={account.title} balance={account.balance}/>
            )}
        </HorizontalScroll>
    )
}

export default AccountsOverview;