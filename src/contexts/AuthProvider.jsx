import React, { createContext, useEffect, useState } from 'react'
import app from "../firebase/firebase.config"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth();
const googleProvider = GoogleAuthProvider

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const login = (email, password) => {
       setLoading(true);
       return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return singOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            setUser(currentuser);
            setLoading(false);
        });
        return () => {
            return unsubscribe()
        }
    })

    const authInfo = {
        user, 
        loading, 
        createUser,
        login,
        logOut,
        singUpWithGmail

    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider