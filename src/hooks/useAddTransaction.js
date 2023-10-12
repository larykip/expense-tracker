import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import useGetUserInfo from './useGetUserInfo'

const useAddTransaction = () => {
    //here we get the parsed data (deserialized data)
    const { userID } = useGetUserInfo()

  const addTransaction = async (description, transactionAmount, transactionType) => {
    // Use the 'collection' function to specify the Firestore collection where you want to add a document.
    // It takes two arguments:
    // 1. The 'db' object, which represents the Firestore database.
    // 2. The name of the collection, in this case, 'transactions'.

    // Create a new document in the 'transactions' collection with the following data:
    // - 'userID': The user's ID obtained from 'useGetUserInfo'.
    // - 'description': A description of the transaction.
    // - 'transactionAmount': The amount of the transaction.
    // - 'transactionType': The type of transaction.
    // - 'createdAt': A timestamp indicating when the transaction was created, obtained using 'serverTimestamp()'.

    // The 'addDoc' function is used to add the document to the specified collection.
    // It returns a promise that resolves when the document is successfully added.
    await addDoc(collection(db, 'transactions'), {
        userID,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp()
    })
  }
   // Return an object with a single property 'addTransaction' that holds the 'addTransaction' function.
  // This allows other components to use the 'addTransaction' function when they import this hook.
  return { addTransaction }
}

export default useAddTransaction