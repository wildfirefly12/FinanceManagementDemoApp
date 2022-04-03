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
            })
    }, []);
    
    const handleChooseAccount = (event) => {
        props.setAccountId(event.target.value);
        console.log(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        props.setSearch(event.target.value);
    }
    
    return(
        <div>
            <form onSubmit={handleSearch}>
                <input type={"text"} onChange={handleSearch}/>
                <button>Search</button>
            </form>
            <h3>${props.total}</h3>
            <form>
                <select onChange={handleChooseAccount}>
                    <option value={0}>All Accounts</option>
                    {accounts.map(a => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default TransactionsHeader;