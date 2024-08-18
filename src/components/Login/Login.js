import React, { useContext, useState } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
//import "firebase/auth";

import PasswordError from '../PasswordError/PasswordError';
import { userContext } from '../../App';
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, logInWithEmailAndPassword, signUpWithEmailAndPassword } from './LoginManager';

function Login() {

  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [check, setCheck] = useState({
    emailValid: false,
    passwordValid: false
  })
  const [newUser, setNewUser] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    status: '',
    error: '',
    isSignedUp: false
  })


  const googleSignIn = () => {

    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        navigate(from);
      })

  }

  const googleSignOut = () => {

    handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        navigate(from);
        
      })
  }

  const FbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        navigate(from);
       
      })
  }


  const handleOnBlur = (e) => {
    let check = true;
    if (e.target.name === 'password') {
      let passwordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(e.target.value);
      setCheck((preState) => {
        return { ...preState, passwordValid }
      })
      check = passwordValid;
    }
    if (e.target.name === 'email') {
      let emailCheck = /\S+@\S+\.\S+/.test(e.target.value)
      // console.log(check);
      setCheck((preState) => {
        return { ...preState, emailValid: emailCheck }
      })
      check = emailCheck;
    }
    if (check) {
      const newUpdate = { ...user };
      newUpdate[e.target.name] = e.target.value;
      setUser(newUpdate);
    }
  }
  const handleFrom = (e) => {

    if (newUser && user.email && user.password) {
      console.log(user.email, user.password)
      signUpWithEmailAndPassword(user)
      .then(res=>{
        setUser(res);
        console.log('handleForm',res)
        setLoggedInUser(res);
        navigate(from);
        
      })
    }
    if (!newUser && user.email && user.password) {
      logInWithEmailAndPassword(user)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          navigate(from);
          
        })

    }
    e.preventDefault();


  }

  const SignOut = () => {
    handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        navigate(from);
      

      })
  }








  return (
    <div className='App' >
      {
        user.isSignedIn ? <button onClick={SignOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={FbSignIn}>Sign in using Facebook</button>

      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <h1>Our Authentic System</h1>


      <form onSubmit={handleFrom}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />

        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {newUser && <input type="text" name="name" id="" onBlur={handleOnBlur} autocomplete="off" required placeholder='Your name' />}
        <br />
        <input type="email" name="email" onBlur={handleOnBlur} autocomplete="off" id="" required placeholder='Your email' />
        <br />
        <input type="password" name="password" onBlur={handleOnBlur} autocomplete="off" id="" required placeholder='Your password' />
        <br />
        <input type="submit" value={newUser ? 'Sign UP' : 'Login'} name="submit"></input>
      </form>
      {
        user.isSignedUp ? <p style={{ color: 'green' }}>{user.status}</p> : <p style={{ color: 'red' }}>{user.status}</p>
      }
      {
        !check.passwordValid && <PasswordError />

      }
      {
        !check.emailValid && <p>Email is not valid</p>
      }

    </div>
  );
}

export default Login;
