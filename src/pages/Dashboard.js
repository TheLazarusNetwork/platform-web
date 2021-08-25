import React, { Component, useState, useEffect } from "react";
import Topnav from "../Components/navbar/Topnav";
import "./../styles/Dashboard/dashboard.css";
import { useSelector } from "react-redux";
import NoOrganisations from "../Components/emptySpace/NoOrganisations";
import CreateProfile from "../Components/dashBoard/CreateProfile";
import LoadingAnimation from "../Components/emptySpace/LoadingAnimation";
import ActivityTable from "../Components/dashBoard/ActivityTable";

document.title = "Dashboard | Lazarus Network";

export default function Dashboard(props) {
  const [ipinfo, setIpinfo] = useState(
    JSON.parse(localStorage.getItem("ipinfo"))
  );
  const [userinfo, setUserinfo] = useState({});

  const { loading, error, isUserLoggedIn } = useSelector((state) => ({
    loading: state.user.loading,
    error: state.user.error,
    isUserLoggedIn: state.user.isUserLoggedIn,
  }));
  const { numberofOrgs, currentOrg, orgloading } = useSelector((state) => ({
    orgloading: state.organisations.loading,
    numberofOrgs: state.organisations.numberOfOrgs,
  }));

  const getIp = async () => {
    const jsonResponse = JSON.parse(localStorage.getItem("ipinfo"));
    const userResponse = JSON.parse(
      localStorage.getItem("supabase.auth.token")
    );
    console.log('inside dashboard : ip-',jsonResponse)
    setIpinfo(jsonResponse === null ? {} : jsonResponse);
    setUserinfo(userResponse.currentSession.user);
  };

  useEffect(() => {
    getIp();
  }, []);

  if (loading || orgloading) return <LoadingAnimation />;

  if (!isUserLoggedIn) return <CreateProfile error={error} />;

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
          <div className="flex-div">
            <div className="grey-back ">
              {numberofOrgs === 0 ? (
                <NoOrganisations />
              ) : (
                <div>
                  <h3>
                    Number of Organisation you are part of : {numberofOrgs}
                  </h3>
                  <div>
                    <p>Current Org : {} </p>
                  </div>
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
