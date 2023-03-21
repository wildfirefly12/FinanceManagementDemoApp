import React from "react";

const AccountsOverview = (props) => {
    
    return(
        <div>
            <div>
                <h3>{props.account.title}</h3>
            </div>
            <div>
                <h3>{props.account.balance}</h3>
            </div>
        </div>
    )
}

export default AccountsOverview;