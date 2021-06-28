import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { VscOrganization } from "react-icons/vsc";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

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
    backgroundColor: theme.palette.background.paper,
    border: "1.5px solid #000",
    boxShadow: theme.shadows[5],
  },
}));

export default function Topnav({ page }) {
  const [show, setShow] = useState(false);
  return (
    <nav className="top-nav">
      <h4 className="title">{page}</h4>
      <div className="icons">
        <icon className='btn' onClick={() => {setShow(!show)}}>
          <VscOrganization size={20} />
        </icon>
        <icon>
          <IoIosNotifications size={20} />
        </icon>
        <div className="vertical-divider"></div>
        <icon>
          <Avatar />
        </icon>
      </div>
     
    </nav>
  );
}

function OrgsModal({ show }) {
  const classes= useStyles();
  const [open, setOpen] = useState(show);
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper + " modal"}>
          <div>
            hellloalsdkfjlsadk
            {console.log('hello')}
          </div>
        </div>
      </Modal>
    </div>
  );
}
