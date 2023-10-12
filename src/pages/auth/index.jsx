import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import useGetUserInfo from '../../hooks/useGetUserInfo';
import './style.css'
import { useEffect } from 'react';

export const Auth = () => {
    //router functionality that redirects user after a successful login
    const navigate = useNavigate()
    const { isAuth } = useGetUserInfo()

    const signInWithGoogle = async() => {
        //here we fetch all the associated user info(objects) with the signIn
        const results = await signInWithPopup(auth, provider)
        //Here we collect the info we will require to maintain the session
        //The purpose of a session is that a user can switch pages, refresh page or
        //leave and come back but will not be logged out
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        }
        //Here we store the session on a local storage
        localStorage.setItem("auth", JSON.stringify(authInfo))
        //Here we redirect the user to the landing page after a successful login
        navigate('/expense-tracker')
    }
    //This useEffect navigates to expense tracker if it's establishd that user is authenticated
    useEffect(() => {
        if (isAuth){
            navigate('/expense-tracker')
        }
        // eslint-disable-next-line
    }, [isAuth]);
    return (
        <div className="login-page">
            <p>Sign In With Google to Continue</p>
            <button onClick={signInWithGoogle} className="login-with-google-btn">Sign In With Google</button>
        </div>
    )
}