import "./NavBar.css"

import React, {useState} from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import {Link} from "react-router-dom";

const NavBar = () => {
      
    const [hover, setHover] = useState(false);
    
    const handleSetHover = () => {
        setHover(!hover);
    }
    
    return (
        <div className={"navbar-container"} onMouseEnter={handleSetHover} onMouseLeave={handleSetHover}>
            <Link className={"navbar-link"} to={"/"}><HomeRoundedIcon fontSize={"large"}/>{hover ? <p className={"navbar-link-text"}>Home</p> : ""}</Link>
            <Link className={"navbar-link"} to={"/budget"}><RequestQuoteRoundedIcon fontSize={"large"}/>{hover ? <p className={"navbar-link-text"}>Budget</p> : ""}</Link>
            {/*<Link className={"navbar-link"} to={"/accounts"}><AccountBalanceRoundedIcon fontSize={"large"}/>{hover ? <p className={"navbar-link-text"}>Accounts</p> : ""}</Link>*/}
            <Link className={"navbar-link"} to={"/transactions"}><PaidRoundedIcon fontSize={"large"}/>{hover ? <p className={"navbar-link-text"}>Transactions</p> : ""}</Link>
        </div>
    )
}

export default NavBar;