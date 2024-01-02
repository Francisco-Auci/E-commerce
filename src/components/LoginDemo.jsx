import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import app from '../firebase/firebase.config'

const provider = new GoogleAuthProvider();
const auth = getAuth();

const LoginDemo = () => {
    
    const handleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            alert("Login Succesfully")
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }

  return (
    <div className='m-5 p-5'>
        <button className='bg-primary px-4 text-white' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginDemo