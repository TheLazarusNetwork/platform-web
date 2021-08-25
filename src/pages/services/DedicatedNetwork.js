import React, { useState } from "react";
import Topnav from "../../Components/navbar/Topnav";
import "./../../styles/Dashboard/billing.css";
import CircularProgressBar from "../../Components/commanComponents/progressbar";
import MyChart from "../../Components/commanComponents/chart";
import { BasicTable } from "../../Components/commanComponents/table";

export default function DedicatedNetwork() {
  const [percentage, setPercentage] = useState(50);
  return (
    <>
      {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
      <div className="main">
        <Topnav page="Dedicated VPN" />
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
            <div className='box-title'> Overall Performance </div>
            <MyChart className='chart'/>
          </div>
        </div>

        <div className='table-div shadow'>
          <BasicTable/>
        </div>
      </div>
    </>
  );
}
