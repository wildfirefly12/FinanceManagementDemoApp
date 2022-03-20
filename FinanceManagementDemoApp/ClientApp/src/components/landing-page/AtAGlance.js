import React, {useEffect, useState} from "react";
import axios from "axios";


const AtAGlance = () => {
    
    const getDate = () => {
        var date = new Date();
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        
        return month + "/" + day + "/" + year;
    }

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }
    
    const [accounts, setAccounts] = useState();
    
    useEffect(() => {
        axios.get('/api/Account/Accounts', config)
            .then(response => {
                setAccounts(response.data);
            })
    }, []);
    
    const [totalAmount, setTotalAmount] = useState(0)
    
    const getTotalAmount = () => {
        var total = totalAmount;
        
        for(var i; i < 3; i++){
            total += accounts[i].balance;
        }
        
        setTotalAmount(total);
    }
    
    
    return (
        <div>
            <h3>{getDate()}</h3>
            <h3>{totalAmount}</h3>
        </div>
    )
}

export default AtAGlance;