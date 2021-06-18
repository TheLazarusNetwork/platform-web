import React from "react";
import { BiArrowBack } from "react-icons/bi";

export default function PasswordReset({ auth }) {
  const resetURL = process.env.REACT_APP_HOST_URL + "/updatepassword";

  const resetpassword = (event) => {
    event.preventDefault();

    let email = event.target.elements["email"].value;
    let url = resetURL;
    auth.createRecovery(email, url);
  };

  return (
    <>
      <div className="center">
        <h2>forgot password?</h2>
        <p>
          send a magic link to your registered email account to change password{" "}
        </p>
        <form className="form" onSubmit={resetpassword}>
          <input type="email" placeholder="enter your email" id="email" />
          <button type="submit"> Send Magic Link</button>
        </form>

        <a href="/signup">
          <BiArrowBack />
          go back to home
        </a>
      </div>
    </>
  );
}
