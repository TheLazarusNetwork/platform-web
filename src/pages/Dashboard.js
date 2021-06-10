import React, { Component, useState } from "react";

const location =
  window.location.protocol + "//" + window.location.host + "/verify";
export default function Dashboard(props) {
  const [auth, setAuth] = useState(props.auth);

  const signOutUser = () => {
    auth.logout();
  };

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
      verified = await auth.sendVerificationEmail(location);
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

  return (
    <>
      <div className="logout-btn">
        <button type="button" onClick={signOutUser} className="btn btn-dark">
          Logout
        </button>
      </div>
      <div>
        <button onClick={getdetails}>login details</button>
      </div>
      <div>
        <button onClick={verifyemail}>send verification email</button>
      </div>
      <div>
        <button onClick={createJWT}>create JWT</button>
      </div>
    </>
  );
}
