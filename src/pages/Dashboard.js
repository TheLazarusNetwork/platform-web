import React, { Component, useState } from "react";
import Topnav from "../Components/Navbar/Topnav";
import "./../styles/Dashboard/dashboard.css";
import CircularProgressWithLabel from "@material-ui/core/CircularProgress";
import { BasicTable } from "../utils/table";
import { useSelector } from "react-redux";
import NoOrganisations from "../Components/NoOrganisations";
import CreateProfile from "../Components/CreateProfile";

document.title = "Lazarus Network-dash";

export default function Dashboard(props) {
  const { loading, error, isUserLoggedIn } = useSelector((state) => ({
    loading: state.user.loading,
    error: state.user.error,
    isUserLoggedIn: state.user.isUserLoggedIn,
  }));
  const { numberofOrgs, currentOrg, orgloading } = useSelector((state) => ({
    orgloading: state.organisations.loading,
    numberofOrgs: state.organisations.numberOfOrgs,
    currentOrg: state.organisations.currentOrg,
  }));

  if (loading)
    return (
      <>
        <div className="center">
          <h4>Loading...</h4>
        </div>
      </>
    );

  if (!isUserLoggedIn) return <CreateProfile error={error} />;
  
  if (orgloading)
    return (
      <>
        <div className="center">
          <h4>Loading...</h4>
        </div>
      </>
    );

  if (numberofOrgs == 0) return <NoOrganisations />;

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
              <BasicTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
