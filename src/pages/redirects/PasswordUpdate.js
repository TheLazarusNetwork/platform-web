import React, { useState } from "react";
import PasswordStrengthMeter from "../../Components/PasswordStrengthMeter";
import Auth from "../../api/Auth";


export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const auth = new Auth();

const session = auth.getSession();
console.log(session)
  const access_token = session.access_token

  const updatenewPassword = (event) => {
    event.preventDefault();
    var newpassword = event.target.elements["password"].value;
    var cpassword = event.target.elements["cpassword"].value;

    if (newpassword == cpassword) {
    auth.updateRecovery(access_token, newpassword);               // updating new password after recovery using forgot password
  
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
