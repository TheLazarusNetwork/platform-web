import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "./../styles/Dashboard/dashboard.css";

document.title = "Lazarus Networks-dash";
const verificationURL = process.env.REACT_APP_HOST_URL + "/verify";

export default function Dashboard(props) {
  const [auth, setAuth] = useState(props.auth);

  const getdetails = async () => {
    let details;
    try {
      const data = await auth.checkAuthenticated();
      details = data;
    } catch (e) {
      console.log(e);
    }
    console.log(details);
  };

  const verifyemail = async () => {
    //sending user verification email
    let verified;
    try {
      verified = await auth.sendVerificationEmail(verificationURL);
    } catch (e) {
      console.log(e);
    }
    console.log(verified);
  };

  const createJWT = async () => {
    let jwt;
    try {
      jwt = await auth.createJWT();
    } catch (e) {
      console.log(e);
    }
    console.log(jwt);
  };



  return <>
  <div >
    dashboard
    <button onClick={createJWT}>jwt</button>

  </div>
  </>;
}
