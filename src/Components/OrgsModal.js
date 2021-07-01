import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "./../styles/Organisation/organisation.css";
import { BiRightTopArrowCircle } from "react-icons/bi";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const location = process.env.REACT_APP_HOST_URL;

const manageOrg=()=>{
 
  window.location = location + "/dash/organisations";
}

export default function OrgsModal({ show, onClose }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal open={show} onClose={onClose}>
        <div style={modalStyle} className={classes.paper}>
          <div>
            <div className="main-title">All Organisations</div>
            <div className="divider"></div>
            <div className="tag">current organisation</div>
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
              
            </div>
            <div className="tag">recent Organisation</div>
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
              <div>
                <icon className="btn">
                  <BiRightTopArrowCircle />
                </icon>
              </div>
            </div>
          </div>
          <div className='center'>
            <button className='simple-btn' onClick={manageOrg}>Manage  All Organisation</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
