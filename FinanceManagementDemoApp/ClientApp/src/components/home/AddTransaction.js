import "./AddTransaction.css";
import React, {useState} from "react";
import axios from "axios";
import {Button, FormControl, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";

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
    
    const [categoryId, setCategoryId] = useState(0);
    
    const handleChangeCategoryId = (event) => {
        setCategoryId(event.target.value);
    }
    
    const addTransaction = async () => {
        var formData = new FormData();
        formData.append("id", accountId);
        formData.append("categoryId", categoryId);
        formData.append("amount", amount);
        formData.append("date", date);
        formData.append("description", description);

        const formConfig ={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios.post('/api/Transactions/CreateTransaction', formData, formConfig)
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
    }

    return(
        <div className={"transactionForm"}>
            <h4>{props.type}</h4>
            <form onSubmit={addTransaction}>
                <FormControl>
                    <Select sx={{margin: 2}} onChange={handleChangeAccountId} value={accountId} label={"Account"} size={"small"}>
                        <MenuItem key={0} value={0} disabled>Select an account</MenuItem>
                        {props.accounts.map(a => (
                            <MenuItem key={a.id} value={a.id}>{a.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <Select sx={{margin: 2}} onChange={handleChangeCategoryId} value={categoryId} label={"Category"} size={"small"}>
                        <MenuItem key={0} value={0} disabled>Select an category</MenuItem>
                        {props.categories.map(c => (
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))} 
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField sx={{margin: 2}} onChange={handleChangeAmount} variant={"outlined"} label={"Amount"} inputProps={{type: "number", step: ".01"}} size={"small"} />
                </FormControl>
                <FormControl>
                    <TextField sx={{margin: 2}} onChange={handleChangeDate} variant={"outlined"} type={"date"} size={"small"} />
                </FormControl>
                <FormControl>
                    <TextField sx={{margin: 2}} onChange={handleChangeDescription} variant={"outlined"} label={"Description"} multiline maxRows={3} size={"small"}/>
                </FormControl>
                <Button variant={"contained"} size={"small"} type={"submit"}>Submit</Button>
            </form>
        </div>
    )
}

export default AddTransaction;