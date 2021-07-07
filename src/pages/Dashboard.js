import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topnav from "../Components/Topnav";
import "./../styles/Dashboard/dashboard.css";
import CircularProgressWithLabel from "@material-ui/core/CircularProgress";
import { BasicTable } from "../utils/table";

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
      // console.log(e);
    }
    // console.log(details);
  };

  const verifyemail = async () => {
    //sending user verification email
    let verified;
    try {
      verified = await auth.sendVerificationEmail(verificationURL);
    } catch (e) {
      // console.log(e);
    }
    // console.log(verified);
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

  //  <button onClick={createJWT}>jwt</button>
  return (
    <>
      {/* <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      /> */}

      <div className="main">
        <Topnav page="Dashboard" />
        <div>
          <div className="grey-back">
            <div className="mini-details-box mini shadow">
              <CircularProgressWithLabel variant="determinate" value={75} />
              <div className="content">
                <h6>Status</h6>
                <p>75 %</p>
              </div>
            </div>
            <div className="mini-details-box  shadow">
              <h6>Average Time</h6>
              <p>5.2</p>
            </div>
            <div className="mini-details-box  shadow">
              <CircularProgressWithLabel variant="determinate" value={85} />
            </div>
          </div>

          <div className="flex-div">
            <div className="mid-details-box shadow">
              <div className="title"> Recent activity</div>
              <div className="divider"></div>
              <div className="activity-section">
                <div>
                  <h6>Anonymous vpn</h6>
                  <p>4 people</p>
                </div>
                <p>12$</p>
              </div>

              <div className="activity-section">
                <div>
                  <h6>Anonymous vpn</h6>
                  <p>4 people</p>
                </div>
                <p>12$</p>
              </div>
            </div>
            <div className="table mid-details-box shadow">
            <div className="title"> Recent activity</div>
            <BasicTable/>
            </div>
          </div>
        </div>
        <button onClick={createJWT}>create jwt</button>
      </div>
    </>
  );
}
