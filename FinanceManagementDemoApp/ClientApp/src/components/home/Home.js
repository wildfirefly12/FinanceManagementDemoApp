import React, {useEffect, useState} from "react";
import axios from "axios";
import AtAGlance from "./AtAGlance";
import AccountsOverview from "./AccountsOverview";
import AddTransaction from "./AddTransaction";

const Home = (props) => {
    
    return (
        <div>
            <div>
                <AtAGlance transactions={props.transactions} accounts={props.accounts} displayBalance={props.displayBalance}/>
                <AddTransaction type={"Add Expense"} accounts={props.accounts} value={"debit"}/>
                <AddTransaction type={"Add Income"} accounts={props.accounts} value={"credit"}/>
            </div>
            <div>
                {props.accounts.map(a => (
                    <AccountsOverview key={a.id} account={a}/>
                ))}
            </div>
        </div>
    )
}

export default Home;