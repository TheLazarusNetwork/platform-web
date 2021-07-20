import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useLocation, useHistory } from "react-router";

export default function RedirectedUrlPage({ auth }) {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf("access_token") != -1) {
      localStorage.setItem("location", getQueryVariable("type"));
      console.log(localStorage.getItem("location"));
    }
  }, []);

  function getQueryVariable(variable) {
    var query = location.pathname.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  // console.log(location.pathname);
   
   return null;
}

function Emailverification() {
  return (
    <div className="center">
      <h1>Your email has been verified .</h1>
      <h4>You can now login to access your dashboard</h4>
      <div className="center">
        <Link to="/signup">
          <button>to to signin page</button>
        </Link>
      </div>
    </div>
  );
}
