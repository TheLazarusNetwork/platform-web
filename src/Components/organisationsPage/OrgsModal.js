import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/Organisation/organisation.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import { MdSwapHoriz } from "react-icons/md";

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

  const { orgArray, currentOrgID } = useSelector((state) => ({
    orgArray: [...state.organisations.orgArray],
    currentOrgID: state.organisations.CurrentOrgID,
  }));

  const [currOrg, setCurrOrg] = useState(null);
  const dispatch = useDispatch();

  const getcurrentOrg = () => {
    //find all details of current Organisation using current Org ID
    let currentOrg = orgArray.find((org) => org.ID === currentOrgID);
    setCurrOrg(currentOrg);
  };

  useEffect(() => {
    //fetch current org using current Org ID
    getcurrentOrg();
  }, [currentOrgID]);

  return (
    <div>
      <Modal open={show} onClose={onClose}>
        <div style={modalStyle} className={classes.paper}>
          <div>
            <div className="main-title">All Organisations</div>
            <div className="divider"></div>

            {/* current org box */}
            <div className="tag">current organisation</div>

            {currOrg ? (
              <div className="org-box">
                <div className="name">{currOrg.name}</div>
              </div>
            ) : (
              <div> no current org</div>
            )}

            <div className="tag">all Organisations</div>

            <div  className="org-box">
                <div className="name">Organisation name</div>  
            </div>
          </div>

          {/* button to go to the all organisations page */}
          <div className="center">
            <Link to="/dash/organisations">
              <button className="simple-btn">Manage All Organisation</button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
