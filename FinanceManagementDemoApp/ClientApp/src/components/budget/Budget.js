import "./Budget.css";

import React from "react";
import AddCategory from "./AddCategory";
import Categories from "./Categories";
import EstimatedExpense from "./EstimatedExpense";

const Budget = (props) => {
    
    
    return (
       <div className={"budget-container"}>
           <div className={"add-container"}>
               <AddCategory/>
               <EstimatedExpense/>
           </div>
           <div className={"categories-container"}>
               <Categories config={props.config}/>
           </div>
       </div>
    )
}

export default Budget;