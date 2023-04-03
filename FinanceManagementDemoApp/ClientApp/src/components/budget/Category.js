import "./Category.css";

import React, {useEffect, useState} from "react";
import axios from "axios";

const Category = (props) => {
    
    const [actual, setActual] = useState(0);
    
    useEffect(() => {
        axios.get("/api/Transactions/TotalByCategory", {
            params: {
                catId: props.id
            },
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        }).then(response => {
            setActual(response.data);
        }).catch(error => {
            console.log(error);
        })
    })
    
    return(
        <div className={"category"}>
            <p className={"categoryTitle"}>{props.name}</p>
            <p className={"categoryAmount"}>{actual}</p>
            <p className={"categoryAmount"}>{props.total}</p>
        </div>
    )
}

export default Category;