import "./Home.css"

import React, {useEffect, useState} from "react";
import AtAGlance from "./AtAGlance";
import AccountsOverview from "./AccountsOverview";
import AddTransaction from "./AddTransaction";
import AddAccount from "./AddAccount";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ResponsiveContainer
} from 'recharts';
import axios from "axios";


const Home = (props) => {
    
    const [expensesTotals, setExpensesTotals] = useState([]);
    
    useEffect(() => {
        axios.get("/api/Transactions/TotalExpensesByMonths", props.config)
            .then(response => {
                setExpensesTotals(response.data);
            }).catch(error => {
                console.log(error);
        })
    }, [])

    const [totals, setTotals] = useState([]);

    useEffect(() => {
        axios.get("/api/Transactions/TotalsByMonths", props.config)
            .then(response => {
                setTotals(response.data);
            }).catch(error => {
            console.log(error);
        })
    }, [])
    
    return (
        <div className={"home-container"}>
            <div className={"left-container"}>
                <AtAGlance  />
                <AddTransaction type={"Add Expense"} accounts={props.accounts} value={"debit"} categories={props.categories}/>
                <AddTransaction type={"Add Income"} accounts={props.accounts} value={"credit"} categories={props.categories}/>
                <AddAccount formConfig={props.formConfig}/>
            </div>
            <div className={"right-container"}>
                <AccountsOverview accounts={props.accounts}/>
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart data={expensesTotals} margin={{top: 5, right: 5, left: 0, bottom: 0}}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="lightblue" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="95%" height={400}>
                    <LineChart data={totals} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="expenses" stroke="red" />
                        <Line type="monotone" dataKey="income" stroke="green" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Home;