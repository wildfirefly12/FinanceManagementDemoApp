import "./AccountCard.css";

import React from "react";

const AccountCard = (props) => {

    return(
        <div className={"account-card-container"}>
            <div className={"account-title"}>
                <h3>{props.title}</h3>
            </div>
            <div className={"account-balance"}>
                <h3>{(props.balance).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumSignificantDigits: props.balance.toFixed(2).length
                })}</h3>
            </div>
        </div>
    )
}

export default AccountCard;