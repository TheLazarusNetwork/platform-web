import React, { useState } from "react";
import PasswordStrengthMeter from "../../Components/PasswordStrengthMeter";

export default function PasswordUpdate(props) {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(props.auth);

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const updatenewPassword = (event) => {
    event.preventDefault();
    var newpassword = event.target.elements["password"].value;
    var cpassword = event.target.elements["cpassword"].value;

    if (newpassword == cpassword) {
      auth.updateRecovery(userId, secret, newpassword);               // updating new password after recovery using forgot password
    }
  };

  return (
    <div className="center">
      <h4>Update Password</h4>
      <form onSubmit={updatenewPassword}>
        <input
          id="password"
          type="password"
          placeholder="new password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <PasswordStrengthMeter password={password} />
        <input
          id="cpassword"
          type="password"
          placeholder=" confirm password"
        ></input>

        <button type="submit">update password</button>
      </form>
    </div>
  );
}
