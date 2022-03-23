import React, {useEffect, useState} from "react";
import axios from "axios";


const AtAGlance = () => {
    
    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        return month + "/" + day + "/" + year;
    }

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }
    
    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        axios.get('/api/Account/Accounts', config)
            .then(response => {
                setAccounts(response.data);
            })
    }, []);
    
    const [totalAmount, setTotalAmount] = useState(0);
    
    const getTotalAmount = () => {
        let total = 0;
        
        for(let i = 0; i < accounts.length; i++){
            total += accounts[i].balance;
        }
        
        return total;
    }
    
    return (
        <div>
            <h3>{getDate()}</h3>
            <h3>{getTotalAmount()}</h3>
        </div>
    )
}

export default AtAGlance;