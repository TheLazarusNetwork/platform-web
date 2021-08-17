import React, { Component, useState, useEffect } from "react";
import Topnav from "../Components/navbar/Topnav";
import "./../styles/Dashboard/dashboard.css";
import CircularProgressWithLabel from "@material-ui/core/CircularProgress";
import { BasicTable } from "../Components/commanComponents/table";
import { useSelector } from "react-redux";
import NoOrganisations from "../Components/emptySpace/NoOrganisations";
import CreateProfile from "../Components/dashBoard/CreateProfile";
import LoadingAnimation from "../Components/emptySpace/LoadingAnimation";
import ErrorAlert from "../Components/commanComponents/errorAlert";

document.title = "Dashboard | Lazarus Network";


export default function Dashboard(props) {
  const [ipinfo, setIpinfo] = useState({});
  const [userinfo, setUserinfo] = useState({});

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

  
  function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE ',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

 var browser=get_browser_info();
console.log(browser.name);
console.log(browser.version);

  const getIp = async () => {
    const jsonResponse = JSON.parse(localStorage.getItem("ipinfo"));
    const userResponse = JSON.parse(
      localStorage.getItem("supabase.auth.token")
    );
    setIpinfo(jsonResponse);
    setUserinfo(userResponse.currentSession.user);
    
  };
  console.log(userinfo);
  useEffect(() => {
    getIp();
  }, []);

  if (loading || orgloading) return <LoadingAnimation />;

  if (!isUserLoggedIn) return <CreateProfile error={error} />;

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
            
            {/* <div className="mini-details-box mini shadow">
              <CircularProgressWithLabel variant="determinate" value={75} />
              <div className="content">
                <h6>Status</h6>
                <p>75 %</p>
              </div>
            </div> */}
            <div className="mini-details-box  shadow">
              <h6>Browser : {browser.name}</h6>
            </div>
            <div className="mini-details-box  shadow">
              <h6>Browser version : {browser.version}</h6>
            </div>
          </div>

          <div className="flex-div">
            <div className="mid-details-box shadow">
              <div className="title"> Recent activity</div>
              <div className="divider"></div>
              <div>
              <p ><span className='title'> email </span> : {userinfo.email}</p>
              <p ><span className='title'> last sign-in at </span> : {userinfo.last_sign_in_at}</p>
              <p ><span className='title'> role </span> : {userinfo.role}</p>
              </div>

              {/* <div className="activity-section">
                <div>
                  <h6>Anonymous vpn</h6>
                  <p>4 people</p>
                </div>
                <p>12$</p>
              </div> */}
            </div>
            <div className="table mid-details-box shadow">
              <div className="title"> IP Information</div>
              <div className="divider"></div>
              <div>
                {Object.keys(ipinfo).map((innerAttr, index) => {
                  return (
                    <p key={index}>
                      <span className="title"> {innerAttr}</span> :{" "}
                      {ipinfo[innerAttr]}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
