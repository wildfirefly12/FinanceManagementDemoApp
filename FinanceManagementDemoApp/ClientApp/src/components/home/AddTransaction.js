import "./AddTransaction.css";
import React, {useState} from "react";
import axios from "axios";

const AddTransaction = (props) => {
    
    const [accountId, setAccountId] = useState(0);
    
    const handleChangeAccountId = (event) => {
      setAccountId(event.target.value);
    }
    
    const [amount, setAmount] = useState();
    
    const handleChangeAmount = (event) => {
        if(props.value == "debit"){
            setAmount(-event.target.value);
        } else {
            setAmount(event.target.value);
        }
    }
    
    const [date, setDate] = useState("");
    
    const handleChangeDate = (event) => {
        setDate(event.target.value.concat(" 00:00:00"));
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
        formData.append("date", date);
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

        await axios.post('/api/Account/UpdateBalance', formData, formConfig)
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
                <select onChange={handleChangeAccountId} value={accountId}>
                    <option key={0} value={0} disabled>Select an account</option>
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

export default AddTransaction;