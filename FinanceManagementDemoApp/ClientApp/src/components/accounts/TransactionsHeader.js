import React, {useEffect, useState} from "react";
import axios from "axios";

const TransactionsHeader = () => {

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
    
    return(
        <div>
            <form>
                <input type={"text"}/>
                <button>Search</button>
            </form>
            <h3></h3>
            <form>
                <select>
                    <option>All Accounts</option>
                    {accounts.map(a => (
                        <option>{accounts.name}</option>
                    ))}
                </select>
                <select>
                    
                </select>
            </form>
        </div>
    )
}

export default TransactionsHeader;