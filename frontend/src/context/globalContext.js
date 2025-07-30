import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'


const BASE_URL = "https://expense-tracker-production-4d2a.up.railway.app/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    // Helper to get auth headers
    const getAuthHeaders = () => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) return {};
        return {
            headers: { 'x-auth-token': currentToken }
        }
    }
    
    // Auth
    const register = async (userData) => {
        try {
            const res = await axios.post(`${BASE_URL}register`, userData)
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            await loadUser()
            setError(null)
            return true
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed')
            return false
        }
    }

    const login = async (userData) => {
        try {
            const res = await axios.post(`${BASE_URL}login`, userData)
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            await loadUser()
            setError(null)
            return true
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed')
            return false
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    const loadUser = async () => {
        if(localStorage.token) {
            try {
                const res = await axios.get(`${BASE_URL}user`, getAuthHeaders());
                setUser(res.data);
            } catch (err) {
                setError('Session expired, please log in again.');
                setToken(null);
                localStorage.removeItem('token');
            }
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income, getAuthHeaders())
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`, getAuthHeaders())
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeaders())
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    //calculate expenses
    const addExpense = async (expense) => {
        await axios.post(`${BASE_URL}add-expense`, expense, getAuthHeaders())
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, getAuthHeaders())
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeaders())
        getExpenses()
    }

    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) =>{
            total = total + expense.amount
        })
        return total;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }

    // Download transactions as CSV
    const downloadTransactions = () => {
        const all = [...incomes, ...expenses];
        if (all.length === 0) return;
        const replacer = (key, value) => value === null ? '' : value;
        const header = Object.keys(all[0]);
        const csv = [
            header.join(','),
            ...all.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            register,
            login,
            logout,
            user,
            token,
            downloadTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}