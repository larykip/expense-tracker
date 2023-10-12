import { useState } from 'react'
import useAddTransaction from '../../hooks/useAddTransaction'
import useGetTransaction from '../../hooks/useGetTransaction'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import './style.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import {useNavigate} from 'react-router-dom'

export const ExpenseTracker = () => {
    const {addTransaction} = useAddTransaction()
    const { transactions, transactionTotals } = useGetTransaction()
    const{name, profilePhoto} = useGetUserInfo()
    const navigate = useNavigate()
    const {balance, income, expense} = transactionTotals

    const [description, setDescription] = useState('')
    const [transactionAmount, setTransactionAmount] = useState(0)
    const [transactionType, setTransactionType] = useState('income')

    const onSubmit = (e) => {
        //prevents the button from redirecting
        e.preventDefault();
        
        //here we pass the data entered on the formed (passed as parameters)
        addTransaction(description, transactionAmount, transactionType);
        
        //Here we reset the previous inputs entered on the form
        setDescription('')
        setTransactionAmount(0)
        setTransactionType('expense')
    }

    const userSignOut = async() => {
        try{
            await signOut(auth)
            localStorage.clear()
            navigate('/')
        }catch(err){
            console.error(err)
        }
    }
    
    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expense}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                        <input type="number" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} placeholder="Amount" required />
                        <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                        <label htmlFor="expense">Expense</label>
                        <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)}/>
                        <label htmlFor="income">Income</label>
                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
                {profilePhoto ? (
            <div className='profile'>
                <img className='profile-photo' alt='profile' src={profilePhoto} />
                <button className='sign-out-button' onClick={userSignOut} >Sign Out</button>
            </div>
            ) : ''}
            
            </div>
            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const {description, transactionAmount, transactionType, id} = transaction
                        return(
                            <li key={id} style={{ listStyle: 'none' }}>
                                <h4>{description}</h4>
                                <p>{transactionAmount} . <label style={{ color: transactionType === 'income' ? 'green' : 'red' }}>{transactionType}</label></p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}