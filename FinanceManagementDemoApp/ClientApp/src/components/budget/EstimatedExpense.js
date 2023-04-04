import "./EstimatedExpense.css";

import React, {useEffect, useState} from "react";
import axios from "axios";
import {FormControl, MenuItem, Select, TextField, Button} from "@mui/material";

const EstimatedExpense = (props) => {
    
    const [amount, setAmount] = useState(0);
    
    const handleSetAmount = (event) => {
        setAmount(event.target.value);
    }
    
    const [categoryId, setCategoryId] = useState(0);
    
    const handleSetCategoryId = (event) => {
        setCategoryId(event.target.value);
    }
    
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get("/api/Category", props.config)
            .then(response => {
                setCategories(response.data);
            }).catch(error => {
                console.log(error);
        })
    }, [])
    
    const handleAddExpense = () => {
        const data = new FormData();
        data.append("amount", amount);
        data.append("id", categoryId);
        
        axios.post("/api/Category/addExpense", data, props.formConfig)
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"estimated-expense-form"}>
            <p>Edit Estimated Expense</p>
            <FormControl sx={{margin: 2}}>
                <TextField variant={"outlined"} placeholder={"Amount"} label={"Amount"}  inputProps={{type: "number", step: ".01"}} onChange={handleSetAmount} />
            </FormControl>
            <Select sx={{margin: 2}} onChange={handleSetCategoryId} value={categoryId}>
                <MenuItem disabled value={0}>Select a category</MenuItem>
                {categories.map(category => 
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                )}
            </Select>
            <Button variant={"contained"} onClick={handleAddExpense}>Add</Button>
        </div>
    )
}

export default EstimatedExpense;