import React, { useState, useEffect } from "react";
import Topnav from "../../Components/navbar/Topnav";
import "./../../styles/Dashboard/billing.css";
import ServiceDetails from "../../Components/commanComponents/ServiceDetails";
import CircularProgressBar from "../../Components/commanComponents/progressbar";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorAlert from "../../Components/commanComponents/errorAlert";
import LoadingAnimation from "../../Components/emptySpace/LoadingAnimation";
import { useDispatch } from "react-redux";

export default function AnonymousVPN() {
  const [active, setactive] = useState(true);

  const dispatch = useDispatch()
  const {plans , plansError ,loading} = useSelector( state =>({
    plans : (state.plans.currentPlans !==null) ?[...state.plans.currentPlans].filter(plan => plan.service === 'anon_vpn') : null,
    plansError : state.plans.error,
    loading : state.plans.loading,
  }))

  if(active)
  {
    // dispatch(fetchRegions());
  }

  if(loading)
  return <LoadingAnimation/>

  return (
    <>
      {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
        {/* {error && <ErrorAlert
                      message ={error.message}
                      setOpen ={"true"}/>} */}
      <div className="main">
        <Topnav page="Anonymous VPN" />
        {active ? <AVPN /> : <ServiceDetails plansArray ={plans} error={plansError} />}
      </div>
    </>
  );
}

const AVPN = () => {
  const [percentage, setPercentage] = useState(50);
  const [ipinfo, setIpinfo] = useState({});
  const [create, setCreate] = useState(false);

  const RegionName ="regionName";
  const Code = "code";

  const getIp = async () => {
    const jsonResponse = JSON.parse(localStorage.getItem('ipinfo'))
    console.log("inside anomvpn")
    setIpinfo(jsonResponse ? jsonResponse : {});
  };

  useEffect(() => {getIp()}, []);
  return (
    <>
      <div className="flex-div">
        <div className="mid-details-box shadow">
          <div className="box-title">Total System Usage </div>

          <CircularProgressBar
            strokeWidth="10"
            sqSize="150"
            percentage={percentage}
          />
        </div>

        <div className="mid-details-box shadow">
          <div className="box-title"> Current Active Client </div>

          <div>
            <span>IP address : </span>
            {ipinfo.ip}
          </div>
          <div>
            <span>City : </span>
            {ipinfo.city}
          </div>
          <div>
            <span>Country : </span>
            {ipinfo.country}
          </div>
        </div>
      </div>
      <div className="table">
        <div className="org-box">
          <div className="name">{RegionName}</div>
          <div className="role">{Code}</div>
          <div>
            <Link to={'/dash/anonymousVPN/clients/:' +RegionName}>
            <button className="simple-btn">
              see all clients
            </button>
            </Link>
            <button className="simple-btn" onClick={() => setCreate(!create)}>
              create new client
            </button>
          </div>
        </div>
    
      
      </div>
      {/* <div className="center">
        <Link to="">
          <button>Upgrade plan</button>
        </Link>
      </div> */}

      {create && (
        <CreateClient show={create} onClose={() => setCreate(false)} />
      )}
    </>
  );
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 550,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 export function ShowClient({RegionName, Code}) {
  const [serviceEnabled, setServiceEnabled] = useState(false);
  return (
    <div className='main'>
        <div className='mid-details-box'>
          <div className="main-title">All Clients</div>
          <div className="divider"></div>

          {/*AVPN client information  */}
          <div className="org-box">
            {/* config file download btn */}
            <FaFileDownload />
            <div className="name">client email</div>
            <div className="role">device</div>
            <div>
              {/* button to go the this organisation */}
              <icon className="btn">
                {serviceEnabled ? (
                  <BsToggleOn onClick={() => setServiceEnabled(false)} color="green" />
                ) : (
                  <BsToggleOff onClick={() => setServiceEnabled(true)} />
                )}
              </icon>
              {/* delete this client  */}
              <icon className="btn">
                <AiFillDelete />
              </icon>
            </div>
          </div>
        </div>
     
    </div>
  );
}

//modal to open create new client form
function CreateClient({ show, onClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal open={show} onClose={onClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className="main-title">Create New Client</div>
          <div className="divider"></div>

          <form>
            <input placeholder="name"></input>
            <input type="email" placeholder="email"></input>
            <input placeholder="device"></input>
            <button className="save-btn" type="submit">
              create client
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
