import React, { useState, useEffect } from "react";
import Topnav from "../../Components/Topnav";
import "./../../styles/Dashboard/billing.css";
import ServiceDetails from "../../Components/ServiceDetails";
import CircularProgressBar from "../../utils/progressbar";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import {FaFileDownload} from 'react-icons/fa'


export default function AnonymousVPN() {
  const [active, setactive] = useState(false);
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
  const [ipinfo, setIpinfo] = useState({
    ip: "",
    country: "",
  });
  const [showc, setShowc] = useState(false);
  const [create, setCreate] = useState(false);

  const getIp = async () => {
    const request = await fetch(
      `https://ipinfo.io/json?token=${process.env.REACT_APP_IP_TOKEN}`
    );
    const jsonResponse = await request.json();

    console.log(jsonResponse);
    setIpinfo(jsonResponse);
  };
  useEffect(() => getIp, []);
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
          <div className="name">Region Name</div>
          <div className="role">Code</div>
          <div>
            <button className="simple-btn" onClick={() => setShowc(!showc)}>
              see all clients
            </button>
            <button className="simple-btn" onClick={() => setCreate(!create)}>
              create new client
            </button>
          </div>
        </div>
      </div>
      {showc && <ShowClient show={showc} onClose={() => setShowc(false)} />}
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

function ShowClient({ show, onClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <Modal open={show} onClose={onClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className="main-title">All Clients</div>
          <div className="divider"></div>

{/*AVPN client information  */}
          <div className="org-box">
            {/* config file download btn */}
          <FaFileDownload/>
            <div className="name">client email</div>
            <div className="role">device</div>
            <div>
              {/* button to go the this organisation */}
              <icon className="btn">
                {enabled ? (
                  <BsToggleOn onClick={() => setEnabled(false)} color="green" />
                ) : (
                  <BsToggleOff onClick={() => setEnabled(true)} />
                )}
                
              </icon>
              {/* delete this client  */}
              <icon className='btn'>
                <AiFillDelete />
              </icon>
            </div>
          </div>
        </div>
      </Modal>
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
            <input placeholder='name'></input>
            <input type='email' placeholder='email'></input>
            <input placeholder='device'></input>
            <button className='save-btn' type='submit'>create client</button>
          </form>

        </div>
      </Modal>
    </div>
  );
}
