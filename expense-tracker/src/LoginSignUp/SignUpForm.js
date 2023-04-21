import React, { useState } from "react";
import "./SignUpForm.css";

async function signUp(signupData){
    try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHwPOoN9Mgoiiz-2aKSX1KZNmp_u7SnA0', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData)
        });
        const data = await response.json();
        if(data.error){
            throw new Error(data.error.message)
            // console.log(data.error.message)
        }

        console.log(data); // contains the Firebase ID token, refresh token, and other user data
        console.log('User has successfully signed up.')
      } catch (error) {
        console.error(error); // handle signup error
        throw error;
      }
}

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
     event.preventDefault();
     if (password === confirmPassword){
            signUp({  email: email,
            password: password,
            returnSecureToken: true})

            setEmail('');
            setPassword('');
            setConfirmPassword('')
        }else{
            alert('password mismatch')
        };
    }

  const handleLoginClick = () => {
    // switch to login form
  };



  return (
    <div className="signup-card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
        <div className="login-card">
        <p className="login-text">Already have an account?</p>
        <button className="login-button" type="button" onClick={handleLoginClick}>Login</button>
      </div>
      </form>
    </div>
  );
}

export default SignupForm;