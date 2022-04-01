import React, {useEffect, useState} from "react";
import axios from "axios";

const TransactionsHeader = (props) => {

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    }

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('/api/Account/Accounts', config)
            .then(response => {
                setAccounts(response.data);
                console.log(response.data);
            })
    }, []);
    
    const handleChooseAccount = (event) => {
        props.setAccountId(event.result);
    }
    
    return(
        <div>
            <form>
                <input type={"text"}/>
                <button>Search</button>
            </form>
            <h3></h3>
            <form>
                <select onSelect={handleChooseAccount}>
                    <option>All Accounts</option>
                    {accounts.map(a => (
                        <option key={a.id}>{a.title}</option>
                    ))}
                </select>
                <select>
                    
                </select>
            </form>
        </div>
    )
}

export default TransactionsHeader;