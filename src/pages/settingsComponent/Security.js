import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Passwordbreach from "../../Components/passwords/Passwordbreach";
import SnackbarAlert from "../../Components/commanComponents/snackbar";
import { createActivity } from "../../Components/dashBoard/ActivityTable";
import { useSelector } from "react-redux";

//security page

export default function Security ({ auth }) {

    const [alertopen, setAlertopen] = useState(false);
    const [alertmsg, setAlertmsg] = useState(" ");
    const [alerttype, setAlertype] = useState("error");

    const [password, setPassword] = useState(" "); //for checking the password strength using password strength meter
   
    const {userdata} = useSelector((state)=>({
      userdata : state.user.currentUserData
    }))

    const [mfauth, setMfauth] = useState(userdata.mfa);
  
    const handleswitchChange = (event) => {
      setMfauth(event.target.checked );
    };
  
    const handlepasswordchange = async (event) => {
      event.preventDefault();
      var currentpassword = event.target.elements["currentpassword"].value;
      var newpassword = event.target.elements["newpassword"].value;
      var repassword = event.target.elements["repeatpassword"].value;
  
      if (newpassword.toString().length < 8) {
        // show alert if password length is less than 7 or both password do not match
        setAlertype("error");
        setAlertmsg("password should be at least 8 letters");
        setAlertopen(true);
      } else if (newpassword !== repassword) {
        {
          setAlertype("error");
          setAlertmsg("passwords do not match");
          setAlertopen(true);
        }
      } else {
        const {data, error}= await auth.updatePassword(
          newpassword
        );
        if (data) {
          setAlertype("success");
          setAlertmsg("password Changed successfully");
          setAlertopen(true);
          createActivity('Password Changed')
        } else {
          setAlertype("error");
          setAlertmsg("password Changed unsuccessful");
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
        <div>
          <div className="details-box shadow ">
            <div className="inner-details">
              <div className="box-title">Change Password</div>
              <form onSubmit={handlepasswordchange}>
                <div className="row">
                  <div className="row-div">
                    <p className="info-txt">
                      <AiOutlineExclamationCircle /> New password must be
                      different from old password
                    </p>
  
                    <p className="info-txt">
                      <AiOutlineExclamationCircle /> Password must be atleast 8
                      characters
                    </p>
                  </div>
  
                  <div className="row-div">
                    <input
                      type="password"
                      placeholder="current password"
                      id="currentpassword"
                    ></input>
                    <input
                      id="newpassword"
                      type="password"
                      placeholder="new password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                    <input
                      id="repeatpassword"
                      type="password"
                      placeholder="confirm new password"
                    ></input>
                    <Passwordbreach password={password} />
                  </div>
                </div>
                <button type="submit" className="save-btn">
                  save changes
                </button>
              </form>
            </div>
          </div>
          
          <div className="details-box shadow ">
            <div className="inner-details">
              <div className="box-title">Multi Factor authentication</div>
              <div className="row">
                <div className="row-div">
                  <p className="info-txt">
                    Settings up multifactor mfaauthentication makes your account
                    more secure
                  </p>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                    disabled
                      checked={mfauth}
                      onChange={handleswitchChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Setup Multifactor auth"
                />
              </div>
            </div>
          </div>
  
          <div className="details-box shadow ">
            <div className="inner-details">
              <form>
                <div className="box-title">Contact Information</div>
                <div className="row">
                  <div className="row-div">
                    <p className="info-txt">
                      <AiOutlineExclamationCircle /> this email /contact will be
                      used for 2 factor mfaauthentication
                    </p>
                  </div>
                  <div className="row-div">
                    <input
                      id="contact"
                      type="tel"
                      placeholder="contact number"
                    ></input>
                    <input id="email" type="email" placeholder="email"></input>
                  </div>
                </div>
                <button className="save-btn">
                  save changes
                </button>
              </form>
            </div>
          </div>
  
        
        </div>
      </>
    );
  };
  
  