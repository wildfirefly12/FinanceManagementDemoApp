import "./AddAccount.css";
import React, {useState} from "react";
import axios from "axios";

const AddAccount = (props) => {

    const [name, setName] = useState("");
    
    const handleSetName = (event) => {
        setName(event.target.value);
        console.log(name)
    }

    const [description, setDescription] = useState("");

    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    }
    
    const [balance, setBalance] = useState(0)
    
    const handleSetBalance = (event) => {
        setBalance(event.target.value);
        console.log(balance)
    }
    
    const handleCreateAccount = () => {
        const data = new FormData;
        data.append("name", name);
        data.append("description", description);
        data.append("balance", balance.toString());
        
        axios.post("/api/Account/CreateAccount", data, props.formConfig)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
        })
    }
    
    return(
        <div className={"account-form"}>
            <h4>Add Account</h4>
            <form onSubmit={handleCreateAccount}>
                <p>Name</p>
                <input onChange={handleSetName}/>
                <p>Description</p>
                <textarea onChange={handleSetDescription}/>
                <p>Starting Balance</p>
                <input type={"number"} step={".01"} onChange={handleSetBalance}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}

export default AddAccount;