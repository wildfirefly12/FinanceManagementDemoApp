import "./Home.css"

import React from "react";
import AtAGlance from "./AtAGlance";
import AccountsOverview from "./AccountsOverview";
import AddTransaction from "./AddTransaction";

const Home = (props) => {
    
    return (
        <div className={"home-container"}>
            <div className={"left-container"}>
                <AtAGlance transactions={props.transactions} accounts={props.accounts} />
                <AddTransaction type={"Add Expense"} accounts={props.accounts} value={"debit"}/>
                <AddTransaction type={"Add Income"} accounts={props.accounts} value={"credit"}/>
            </div>
            <div className={"right-container"}>
                <AccountsOverview accounts={props.accounts}/>
            </div>
        </div>
    )
}

export default Home;