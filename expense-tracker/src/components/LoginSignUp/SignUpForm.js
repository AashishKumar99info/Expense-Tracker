import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

async function signUp(signupData, isLoggedIn, Actions) {
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHwPOoN9Mgoiiz-2aKSX1KZNmp_u7SnA0'
  if (isLoggedIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHwPOoN9Mgoiiz-2aKSX1KZNmp_u7SnA0'
  }
  try {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message)
      // console.log(data.error.message)
    }
    else {
      if (isLoggedIn) {
        Actions.navto(`/home/${data.idToken}`)
        Actions.LoggedIn(true);
        Actions.idToken(data.idToken)
      }
    }

    console.log(data); // contains the Firebase ID token, refresh token, and other user data
    console.log('User has successfully signed up.')
  } catch (error) {
    console.log(error(error)); // handle signup error
    throw error;
  }
}

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogIn, setIsLogin] = useState(false);
  const navto = useNavigate();
  const ctx = useContext(AppContext)


  const handleSubmit = (event) => {
    const userDetails = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    event.preventDefault();
    if (isLogIn) {
      const actions = { navto: navto, LoggedIn: ctx.setIsLoggedIn, idToken: ctx.setidToken }
      signUp(userDetails, isLogIn, actions);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {

      if (password === confirmPassword) {

        signUp(userDetails, isLogIn)

      } else {

        alert('password mismatch')
      }
    };
  }

  const handleLoginClick = () => {
    // switch to login form
    setIsLogin((preState) => !preState);
  };



  return (
    <div className="signup-card">
      <h2>{`${isLogIn ? "Login" : "Sign Up"}`}</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>
        {!isLogIn && (
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        )}
        <button type="submit">{`${isLogIn ? "Login" : "Sign Up"}`}</button>
      </form>
      <button className="login-card" onClick={handleLoginClick}>
        <p className="login-text">{`${isLogIn ? "Create New Account" : "Already Have An Account ? Login"
          }`}</p>
      </button>
    </div>
  );
}

export default SignupForm;