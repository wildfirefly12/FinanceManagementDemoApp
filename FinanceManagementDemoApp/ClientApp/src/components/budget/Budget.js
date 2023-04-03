import "./Budget.css";

import React from "react";
import AddCategory from "./AddCategory";

const Budget = (props) => {
    
    
    return (
       <div>
           <div className={"budget-container"}>
               <AddCategory/>
           </div>
       </div>
    )
}

export default Budget;