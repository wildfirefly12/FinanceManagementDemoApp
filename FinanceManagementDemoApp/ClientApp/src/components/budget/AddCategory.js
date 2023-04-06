import "./AddCategory.css";

import React, {useState} from "react";
import axios from "axios";
import {Button, FormControl, Input, InputLabel, TextareaAutosize, TextField} from "@mui/material";

const AddCategory = (props) => {
    
    const [name, setName] = useState("");
    
    const handleSetName = (event) => {
        setName(event.target.value);
    }
    
    const [description, setDescription] = useState("");
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    }
    
    const handleSaveCategory = () => {
        const data = new FormData();
        data.append("name", name);
        data.append("description", description);
        
        axios.post("/api/Category/CreateCategory", data, props.config)
            .then(response => {
                console.log(response.data);
                props.handleSetUpdated();
            }).catch(error => {
                console.log(error);
        })
    }
    
    return (
        <div className={"category-form"}>
            <p>Add Category</p>
            <FormControl sx={{margin: 2}}>
                <TextField variant={"outlined"} placeholder={"Name"} label={"Name"} onChange={handleSetName} />
            </FormControl>
            <FormControl sx={{margin: 2}}>
                <TextField multiline maxRows={"5"} placeholder={"Description"} onChange={handleSetDescription} />
            </FormControl>
            <Button sx={{margin: 2}} variant={"contained"} onClick={handleSaveCategory}>Add</Button>
        </div>
    )
}

export default AddCategory;