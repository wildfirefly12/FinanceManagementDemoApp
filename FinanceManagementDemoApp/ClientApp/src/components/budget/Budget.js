import React, {useEffect, useState} from "react";
import Transaction from "./Transaction";
import axios from "axios";

const Budget = () => {

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }
    
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/api/Transaction/Transactions', config)
            .then(response => {
                console.log(response.data);
                setTransactions(response.data);
            })
    }, []);
    
    return(
        <div>
            {transactions.map(t => (
                <Transaction key={t.id} description={t.description} date={t.date} amount={t.amount} />
            ))}
        </div>
    )
}

export default Budget;