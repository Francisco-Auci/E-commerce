import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

const title = "Register"
const socialTitle = "Loging with Social Media"
const btnText = "Singup"

const Singup = () => {
    const [errorMessage, seterrorMessage,] = useState("");
    const {singUpWithGmail, createUser} = useContext(AuthContext);
    const location = useLocation ();
    const navigate = useNavigate();

    const handleRegister = () => {
        singUpWithGmail().then((result) => {
            const user = result.user;
            navigate(from, {replace: true})
        }).catch((error) => {
            const errorMsg = error.message;
            seterrorMessage("Pleasepovide valid email & password!")
        })
    }
    const handleSingup = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if(password !== confirmPassword){
            seterrorMessage("Password doesn't match! Pleace, provide a correct password")
        }else{
            seterrorMessage("")
            createUser(password, email).then((userCredential) => {
                const user = userCredential.user;
                alert("Account created succesfully done!!!")
                navigate(from, {replace: true})
            }).catch((error) => {
                console.log(error.message);
                alert(`${error.message}`)
            })
        }
    }

  return (
    <div className='login-section padding-tb section-bg'>
            <div className="container">
                <div className="account-wrapper">
                    <h3 className='title'>{title}</h3>
                    <form className='account-form' onSubmit={handleSingup}>
                        <div className="form-group">
                            <input type="text" name="name" id="name" placeholder='Full Name*' required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" id="email" placeholder='Email Address *' required />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" id="password" placeholder='Password *' required />
                        </div>
                        <div className="form-group">
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password *' required />
                        </div>
                        <div>
                            {
                                errorMessage && (
                                    <div className='error-message text-danger'>
                                        {errorMessage}
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <button type='submit' className='d-block lab-btn'>
                                <span>{btnText}</span>    
                            </button>                       
                        </div>
                    </form>
                    <div className='account-bottom'>
                        <span className='d-block cate pt-10'>
                            Have an Account?<Link to="/login">Login</Link>
                        </span>
                        <span className='or'>
                            <span>or</span>
                        </span>
                        <h5 className='subtitle'>{socialTitle}</h5>
                        <ul className='lab-ul social-icons justify-content-center'>
                            <li>
                                <button className='github' onClick={handleRegister}><i className='icofont-github'></i></button>
                            </li>
                            <li>
                                <a href='/' className='facebook'><i className='icofont-facebook'></i></a>
                            </li>
                            <li>
                                <a href='/' className='twitter'><i className='icofont-twitter'></i></a>
                            </li>
                            <li>
                                <a href='/' className='linkedin'><i className='icofont-linkedin'></i></a>
                            </li>
                            <li>
                                <a href='/' className='instagram'><i className='icofont-linkedin'></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Singup