import React, { useState } from "react";
import Topnav from "../../Components/Topnav";
import "./../../styles/Dashboard/billing.css";
import ServiceDetails from "../../Components/ServiceDetails";
import CircularProgressBar from "../../utils/progressbar";

export default function AnonymousVPN() {
  const [active, setactive] = useState(true);
  return (
    <>
      {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
      <div className="main">
        <Topnav page="Anonymous VPN" />
        {active ? <AVPN /> : <ServiceDetails />}
      </div>
    </>
  );
}

const AVPN = () => {
  const [percentage, setPercentage] = useState(50);
  return (
    <>
      <div className="flex-div">
        <div className="mid-details-box shadow">
          <div className="box-title">Total System Usage</div>

          <CircularProgressBar
            strokeWidth="10"
            sqSize="150"
            percentage={percentage}
          />
        </div>
        <div className="mid-details-box shadow">
          <div className="box-title"> Current Active Client </div>

          <div>
            <bold>IP address : </bold>xyx
          </div>
          <div>
            <bold>IP address : </bold>xyx
          </div>
        </div>
      </div>
      <div className="table">
        <div className="org-box">
          <div className="name">Region Name</div>
          <div className="role">Code</div>
          <div>
            <button className='simple-btn' >see all clients</button>
            <button className='simple-btn'>create new client</button>
          </div>
        </div>
      </div>
    </>
  );
};
