import "./Categories.css";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Category from "./Category";

const Categories = (props) => {
    
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get("/api/Category", props.config)
            .then(response => {
                setCategories(response.data);
            }).catch(error => {
                console.log(error);
        })
    }, [])
    
    return (
        <div className={"categories"}>
            <div className={"categories-header"}>
                <p className={"categories-title"}>Category</p>
                <p className={"categories-title"}>Estimated</p>
                <p className={"categories-title"}>Actual</p>
            </div>
            {categories.map(category => 
                <Category key={category.id} id={category.id} name={category.name} total={category.estimatedTotal} />
            )}
        </div>
    )
}

export default Categories;