import "./AtAGlance.css";

import React from "react";

const AtAGlance = (props) => {
    
    const date = new Date();
    const today = (date.getMonth()+1)+ "/" + date.getDate() + "/" + date.getFullYear();
    
    return (
        <div className={"atAGlance"}>
            <h3>{today}</h3>
            <h3>{props.displayBalance(props.accounts, 0)}</h3>
        </div>
    )
}

export default AtAGlance;