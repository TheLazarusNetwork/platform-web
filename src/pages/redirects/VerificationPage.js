import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function VerificationPage(props) {

  // user email verification
  
   return (
    <div className="center">
      <h1>Your email has been verified .</h1>
      <h4>You can now login to access your dashboard</h4>
      <div className="center">
        <Link to="/auth">
          <button>to to signin page</button>
        </Link>
      </div>
    </div>
  );
}
