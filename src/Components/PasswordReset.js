import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import SnackbarAlert from "../utils/snackbar";
import { Link } from "react-router-dom";

export default function PasswordReset({ auth }) {
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");

  const resetpassword = (event) => {
    event.preventDefault();

    let email = event.target.elements["email"].value;
    auth.createRecovery(email);

    //show success alert to user after password recovery link sent
    setAlertype("success");
    setAlertmsg("password link sent");
    setAlertopen(true);
  };

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="center">
        <h2>Magic Link SignIn</h2>
        <p>
          send a magic link to your registered email account to signin 
        </p>
        <form className="form" onSubmit={resetpassword}>
          <input type="email" placeholder="enter your email" id="email" />
          <button type="submit"> Send Magic Link</button>
        </form>

        <Link to="/signup">
          <a>
            <BiArrowBack />
            go back to home
          </a>
        </Link>
      </div>
    </>
  );
}
