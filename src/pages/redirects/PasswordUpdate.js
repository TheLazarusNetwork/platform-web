import React, { useState } from "react";
import PasswordStrengthMeter from "../../Components/PasswordStrengthMeter";
import SnackbarAlert from "../../utils/snackbar";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useLocation } from "react-router";

export default function PasswordUpdate({ auth }) {
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");
  console.log("update password page");
  console.log(location.pathname);


  const updatenewPassword = async (event) => {
    event.preventDefault();
    var newpassword = event.target.elements["password"].value;
    var cpassword = event.target.elements["cpassword"].value;

    if (newpassword.toString().length < 8) {
      // show alert if password length is less than 7 or both password do not match
      setAlertype("error");
      setAlertmsg("password should be at least 8 letters");
      setAlertopen(true);
    } else if (newpassword !== cpassword) {
      setAlertype("error");
      setAlertmsg("passwords do not match");
      setAlertopen(true);
    } else {
      const { data, error } = await auth.updatePassword(newpassword); // updating new password after recovery using forgot password
      if (data) {
        setAlertype("success");
        setAlertmsg("password Changed successfully");
        setAlertopen(true);
      } else {
        setAlertype("error");
        setAlertmsg(error.message);
        setAlertopen(true);
      }
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
        <Link to="/dash/">
          <a>
            <BiArrowBack />
            go back to home
          </a>
        </Link>
      </div>
    </>
  );
}
