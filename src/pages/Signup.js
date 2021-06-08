import React, { useState } from "react";
import "./../styles/forms/signup.css";
import { FaApple, FaMicrosoft, FaGoogle } from "react-icons/fa";
import SHA1 from '../functions/shai.js'
import PasswordStrengthMeter from './../Components/PasswordStrengthMeter.js'
export default function Signup(props) {
  const [auth, setAuth] = useState(props.auth);     //auth class instance from auth.js
  const [rightpanel, setrightpanel] = useState(false);        //right panel true for signup page 
                                                              //false for signin page
  const [password,setPassword] = useState("")


  const handleSignup = (event) => {       //takes all details from sign up form and create new account 
    event.preventDefault();
    var name = event.target.elements["name"].value;
    var email = event.target.elements["email"].value;
    var password = event.target.elements["password-box"].value;
    var repassword = event.target.elements["repassword"].value;
    if (password !== repassword) {                                    
      alert("Passwords do not match");
    } else {
      auth.signup(email, password, name);                         //calling auth method to create new account
    }
  };

  const handleLogin = (event) => {                  // login function 
    event.preventDefault();
    var email = event.target.elements["inemail"].value;
    var password = event.target.elements["inpassword"].value;
    auth.login(email, password);

    auth.checkLogin();
  };

  const handleGoogle = () => {};


  var requestTimeout;
  const passwordKeyPress = () => {            // check for password breaches using pawnedpasswords api
    var password = document.getElementById("password-box").value;
    document.getElementById("iscompromised").innerHTML =
      "<span >&nbsp;We are checking if your password has ever been compromised...</span>";

    clearTimeout(requestTimeout);
    requestTimeout = setTimeout(passwordmodified, 2000);
  };
  var passwordInput = document.getElementById("password-box");
  var passwordplain = "";
  var xhttp;

  function passwordmodified() {
    var modifiedpassword = passwordInput.value;
    if (modifiedpassword !== passwordplain) {
  
      passwordplain = modifiedpassword;
  
      if (passwordplain !== '') {
  
        var sha1pass = SHA1(passwordplain);
        sha1pass = sha1pass.toUpperCase();
        var subsha1pass = sha1pass.substring(5);
        if (xhttp) {
          xhttp.abort();
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var xhttpresponse = this.responseText;
            if (xhttpresponse.indexOf(subsha1pass) !== -1) {
  
              var passlist = xhttpresponse.split("\n");
              var pwnedcount = 0;
              var timespell = 'times';
              for (var i = 0; i < passlist.length; i++) {
                if (subsha1pass == passlist[i].split(":")[0]) {
                  pwnedcount = passlist[i].split(":")[1];
                  if (passlist[i].split(":")[1] == 1){ timespell = "time"; }
                }
              }
  
              document.getElementById("iscompromised").innerHTML = '<span style="color: #ff0000;">Oh no! This password was found <b>'+ pwnedcount + '</b> '+ timespell + ' in compromised passwords databases! </span>';
            }else {
              document.getElementById("iscompromised").innerHTML = '<span style="color: #339966;">Good news, this password has never been breached!</span>';
            }
          }
        };
  
        xhttp.open('GET', 'https://api.pwnedpasswords.com/range/' + sha1pass.substring(0, 5));
        xhttp.send();
      }
  
    }
  }
  
 
  

  return (
    <>
      <div
        className={`container ${rightpanel ? "right-panel-active" : ""} `}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i>
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social">
                <i>
                  <FaApple />
                </i>
              </a>
              <a href="#" className="social">
                <i>
                  <FaMicrosoft />
                </i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" id="name" />
            <input type="email" placeholder="Email" id="email" />
            <input
              type="password"
              placeholder="Password"
              id="password-box"
              onKeyUp={passwordKeyPress}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <PasswordStrengthMeter password={password}/>
            <input
              type="password"
              placeholder="Confirm Password"
              id="repassword"
            />
            <button type="submit">Sign Up</button>
          
            <ul className="hsimp-checks">
              <p id="iscompromised">
                <span>
                  This password was not compromised in any database breach!!
                </span>
              </p>
            </ul>
            <ul id="password-checks" className="hsimp-checks">
            </ul>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i>
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social">
                <i>
                  <FaApple />
                </i>
              </a>
              <a href="#" className="social">
                <i>
                  <FaMicrosoft />
                </i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" id="inemail" />
            <input type="password" placeholder="Password" id="inpassword" />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
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
              <h1>Hello, Friend!</h1>
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

