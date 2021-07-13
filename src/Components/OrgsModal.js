import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "./../styles/Organisation/organisation.css";
import { BiRightTopArrowCircle } from "react-icons/bi";
import {Link} from 'react-router-dom'

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
            {/* current org box */}
            <div className="tag">current organisation</div>
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
            </div>
            <div className="tag">recent Organisation</div>
            <div className="org-box">
              {/* recent organisation box  */}
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
              <div>
                {/* button to go the this organisation */}
                <icon className="btn">
                  <BiRightTopArrowCircle />
                </icon>
              </div>
            </div>
          </div>

          {/* button to go to the all organisations page */}
          <div className="center">
            <Link to='/dash/organisations'>
            <button className="simple-btn">
              Manage All Organisation
            </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
