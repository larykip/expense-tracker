import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState, useCallback } from 'react'
import { db } from '../config/firebase-config'
import useGetUserInfo from './useGetUserInfo'

const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([])
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.00,
    income: 0.00,
    expense: 0.00
  })

  //here we get the parsed data (deserialized data)
  const { userID } = useGetUserInfo()

  const getTransactions = useCallback(async () => {
    let unsubscribe

    try{
        //here we use the collection function(firebase inbuilt) that takes 2 parameters
        //The first is our db object and second is our db collection name
        const queryTransactions = query(collection(db, 'transactions'), 
        where("userID", "==", userID), orderBy("createdAt"));

        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
            let docs = []
            let incomeTotal = 0
            let expenseTotal = 0
            let balance = 0

            snapshot.forEach((doc) => {
                const data = doc.data(); 
                const id = doc.id

                docs.push({ ...data, id })
                if (data.transactionType === 'income'){
                  incomeTotal += Number(data.transactionAmount)
                }else{
                  expenseTotal += Number(data.transactionAmount)
                }
                
                balance = incomeTotal - expenseTotal
            })

            setTransactions(docs)
            setTransactionTotals({
              balance,
              income: incomeTotal,
              expense: expenseTotal
            })
        })
    }catch(err){
      console.error(err)
    }
    return () => unsubscribe();
  }, [userID]);

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  return { transactions, transactionTotals }
}

export default useGetTransaction