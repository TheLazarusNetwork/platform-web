import React, { Component, useState, useEffect } from "react";
import Topnav from "../Components/navbar/Topnav";
import "./../styles/Dashboard/dashboard.css";
import { useSelector } from "react-redux";
import NoOrganisations from "../Components/emptySpace/NoOrganisations";
import CreateProfile from "../Components/dashBoard/CreateProfile";
import LoadingAnimation from "../Components/emptySpace/LoadingAnimation";
import ActivityTable from "../Components/dashBoard/ActivityTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FiSettings } from "react-icons/fi";
import { useGetOrgs } from "../hooks/orgHooks";
import { useGetUser } from "../hooks/userHooks";

document.title = "Dashboard | Lazarus Network";

export default function Dashboard(props) {

  const [ipinfo, setIpinfo] = useState(
    JSON.parse(localStorage.getItem("ipinfo"))
  );
  const [userinfo, setUserinfo] = useState({});
  const [currOrg, setCurrOrg] = useState();
  const [numberofOrgs,currentOrgID,orgArray,orgloading] = useGetOrgs()
 const [userLoading, userError, isUserLoggedIn, currentUser] = useGetUser();

 
  const getcurrentOrg = () => {
    let currentOrg = orgArray.find((org) => org.id === currentOrgID);
    setCurrOrg(currentOrg);
  };

  useEffect(() => {
    getcurrentOrg();
  }, [currentOrgID]);

  const getIp = async () => {
    const jsonResponse = JSON.parse(localStorage.getItem("ipinfo"));
    const userResponse = JSON.parse(
      localStorage.getItem("supabase.auth.token")
    );
    setIpinfo(jsonResponse === null ? {} : jsonResponse);
    setUserinfo(userResponse.currentSession.user);
  };

  useEffect(() => {
    getIp();
  }, []);

  if (userLoading || orgloading) return <LoadingAnimation />;

  if (!isUserLoggedIn) return <CreateProfile userError={userError} />;

  return (
    <>
      {/* <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = userError, success, info ,warning
      /> */}

      <div className="main">
        <Topnav page="Dashboard" />
        <div>
          <div className="flex-div">
            <div className="mid-details-box shadow ">
              {numberofOrgs === 0 ? (
                <NoOrganisations />
              ) : (
                <div>
                  <h3>
                    Number of Organisation you are part of : {numberofOrgs}
                  </h3>
                  {currOrg && (
                    <div className="mid-details-box">
                      <h4>Current Org : {currOrg.name} </h4>
                      <p>Current Org Country : {currOrg.country}</p>
                      <div>
                        <Link to="/dash/organisationSettings">
                          <Button
                            variant="contained"
                            color= 'white'
                            startIcon={<FiSettings />}
                          >Settings
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="table mid-details-box shadow">
              <div className="title"> IP Information</div>
              <div className="divider"></div>
              <div>
                {ipinfo == null || ipinfo == "" || ipinfo == "undefined" ? (
                  <div> Error in fetching Ip Information </div>
                ) : (
                  Object.keys(ipinfo).map((innerAttr, index) => {
                    return (
                      <p key={index}>
                        <span className="title"> {innerAttr}</span> :{" "}
                        {ipinfo[innerAttr]}
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div className=" table-div shadow">
              <div>
                <ActivityTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
