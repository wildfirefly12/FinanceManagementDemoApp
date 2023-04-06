import "./Budget.css";

import React, {useState} from "react";
import AddCategory from "./AddCategory";
import Categories from "./Categories";
import EstimatedExpense from "./EstimatedExpense";

const Budget = (props) => {
    
    const [updated, setUpdated] = useState(0);
    
    const handleSetUpdated = () => {
        setUpdated(updated + 1);
    }
    
    return (
       <div className={"budget-container"}>
           <div className={"add-container"}>
               <AddCategory handleSetUpdated={handleSetUpdated}/>
               <EstimatedExpense updated={updated} handleSetUpdated={handleSetUpdated}/>
           </div>
           <div className={"categories-container"}>
               <Categories config={props.config} updated={updated}/>
           </div>
       </div>
    )
}

export default Budget;