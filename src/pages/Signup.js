import React, { useState ,useEffect} from "react";
import "./../styles/forms/signup.css";
import {  FaGoogle, FaGithub } from "react-icons/fa";
import PasswordStrengthMeter from "../Components/Passwords/PasswordStrengthMeter.js";
import SnackbarAlert from "./../utils/snackbar";
import Passwordbreach from "../Components/Passwords/Passwordbreach";
import { Link } from "react-router-dom";

document.title = " Auth | Lazarus Network";

export default function Signup({auth , history}) {

  const [rightpanel, setrightpanel] = useState(false); //right panel true for signup page  ,false for signin page
  const [password, setPassword] = useState(""); //for checking the password strength using password strength meter
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlerttype] = useState('error')
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(auth.checkAuthenticated())
    auth.onAuthStateChange()
  
  }, [])


  const handleSignup = async (event) => {
    //takes all details from sign up form and create new account
    event.preventDefault();
    // var name = event.target.elements["name"].value;
    var email = event.target.elements["email"].value;
    var password = event.target.elements["password-box"].value;
    var repassword = event.target.elements["repassword"].value;

    if (password.toString().length < 7) {
      // show alert if password length is less than 7 or both password do not match
      setAlertmsg("password should be at least 7 letters");
      setAlertopen(true);
    } else if (password !== repassword) {
      {
        setAlerttype('error')
        setAlertmsg("passwords do not match");
        setAlertopen(true);
      }
    } else {
      const {user,error} =  await auth.signup(email, password); //calling auth.signup method to create new account
      if(error)
      {
        setAlerttype('error')
        setAlertmsg(error.message);
        setAlertopen(true); // signin after signup failed
        // history.push("/failure")
      }
      else if (user) {
        setAlerttype("success")
        setAlertmsg("Login using confirmation link sent to you email account");
        setAlertopen(true);
      
      } 
      else history.push("/failure"); //signup fail
    }
  };

  // login function
  const handleLogin = async (event) => {
    event.preventDefault();
    var email = event.target.elements["inemail"].value;
    var password = event.target.elements["inpassword"].value;

    const {user,error} = await auth.login(email, password); // calling the auth.signin function

    if(error)
    {
      setAlertmsg(error.message);
      setAlerttype("error")
      setAlertopen(true); // else show alert that login failed
      // history.push("/failure");
    }
    if(user)
    {
      await auth.checkAuthenticated() 
     history.push("/success");
    // if login successful , redirect to success page
    }


    // const checklogin = await  auth.getAccount();
    // if (checklogin) history.push("/success");
  };

  const handleGoogle =async () => {
    //google oauth
   const {user,session,error} = await auth.google();
   if(error)
   {
     setAlertmsg(error.message);
     setAlerttype("error")
     setAlertopen(true); // else show alert that login failed
   }
   if(user)
   {
     await auth.checkAuthenticated() 

    history.push("/success");
   // if login successful , redirect to success page
   }
  
  };

  const handleGithub =async () => {
    //google oauth
   const {user,session,error} = await auth.github();
   if(error)
   {
     setAlertmsg(error.message);
     setAlerttype("error")
     setAlertopen(true); // else show alert that login failed
     // history.push("/failure");
   }
   if(user)
   {
     await auth.checkAuthenticated() 
    history.push("/success");
   // if login successful , redirect to success page
   }
  
  };

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div
        className={`container ${rightpanel ? "right-panel-active" : ""} `} // right panel active shows signup form
        id="container"
      >
        <div className="form-container sign-up-container">
          {/*                                                              //signup form - name/email /password/ confirm password
           */}
          <form className="form" onSubmit={handleSignup}>
            <h2>Create Account</h2>
            <div className="social-container">
              <a href="#" className="social" onClick={handleGoogle}>
                <i>
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social" onClick={handleGithub}>
                <i>
                  <FaGithub />
                </i>
              </a>
            </div>
            <span>or use your email for registration</span>
            {/* <input type="text" placeholder="Name" id="name" /> */}
            <input type="email" placeholder="Email" id="email" />
            <input
              type="password"
              placeholder="Password"
              id="password-box"
              // onKeyUp={passwordKeyPress} // on password change check for password breach
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            
            <PasswordStrengthMeter password={password} />
            <input
              type="password"
              placeholder="Confirm Password"
              id="repassword"
            />
            <button type="submit">Sign Up</button>

            <Passwordbreach password={password} />
            {/* signin form with email signin and google oauth */}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social" onClick={handleGoogle}>
                <i>
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social" onClick={handleGithub}>
                <i>
                  <FaGithub />
                </i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" id="inemail" />
            <input type="password" placeholder="Password" id="inpassword" />
            <Link to="/resetpassword"><a>forgot password?</a></Link>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setrightpanel(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setrightpanel(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
