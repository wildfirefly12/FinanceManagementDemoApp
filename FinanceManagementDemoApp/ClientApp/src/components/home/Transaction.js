import "./Transaction.css";
import React, {useState} from "react";
import axios from "axios";
import DateAdapter from '@mui/lab/AdapterMoment';

import {DatePicker, LocalizationProvider} from '@mui/lab';

const Transaction = (props) => {
    
    const [accountId, setAccountId] = useState();
    
    const handleChangeAccountId = (event) => {
      setAccountId(event.target.value);
    }
    
    const [amount, setAmount] = useState();
    
    const handleChangeAmount = (event) => {
      setAmount(event.target.value);
    }
    
    const [date, setDate] = useState(new Date());
    
    const handleChangeDate = (event) => {
        event.preventDefault();
        setDate(new Date(event.target.value));
        console.log(date);
    }
    
    const [description, setDescription] = useState();
    
    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    }
    
    const addTransaction = React.useCallback(async (event) => {
        
        var formData = new FormData();
        formData.append("accountId", accountId);
        formData.append("amount", amount);
        formData.append("date", date.toJSON());
        formData.append("description", description);

        const formConfig ={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios.post('/api/Transaction/CreateTransaction', formData, formConfig)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    })

    return(
        <div className={"transactionForm"}>
            <h4>{props.type}</h4>
            <form onSubmit={addTransaction}>
                <p>Account</p>
                <select onChange={handleChangeAccountId}>
                    {props.accounts.map(a => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>
                <p>Amount</p>
                <input onChange={handleChangeAmount}/>
                <p>Date</p>
                <input type={"date"} onChange={handleChangeDate}/>
                <p>Description</p>
                <input onChange={handleChangeDescription}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}

export default Transaction;