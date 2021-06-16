import React, { useEffect, useState } from "react";
import Topnav from "../Components/Topnav";
import { Avatar, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Auth from "../api/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Profile({ auth }) {
  const [username, setUsername] = useState("");
  const [useremail ,setUseremail] = useState("");
  const [avatar, setavatar] = useState();
  const classes = useStyles();

  // const filechange = (event) => {
  //   let img = event.target.files[0];
  //   setavatar(URL.createObjectURL(img));
  // };
  const fetchData = async () => {
    const userdata = await auth.getAccount();
    setUsername(userdata.name);
    setUseremail(userdata.email)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlechange = (event) => {
    if(event.label =="name")
    setUsername(event.target.value);
    if(event.label == "email")
    setUseremail(event.target.value)
  };
  

  return (
    <>
      <div className="main">
        <Topnav page="Profile" />
        <div className="profile-pic">
          <div className="pic-avatar">
            <Avatar className={classes.large}>{avatar}</Avatar>
            <div className=" pic-description">
              <h6> Your Avatar</h6>
              <p> Png or Jpg max size 5mb </p>
            </div>
          </div>
          {/* <input type="file" onChange={filechange}></input> */}
        </div>

        <div className="divider" />

        <div className="profile-details">
          <div className="title">Personal details</div>
          <div className="personal-details">
            <TextField
            className= "textfield"
              id="outlined-helperText"
              label="name"
              value={username}
              onChange={handlechange}
              variant="outlined"
            />
              <TextField
              className= "textfield"
              id="outlined-helperText"
              label="email"
              value={useremail}
              onChange={handlechange}
              variant="outlined"
            />
          </div>
        </div>

        <div className="profile-details">
          <div className="title">Other Details</div>
          <div className="personal-details">
          <TextField
            className= "textfield"
              id="outlined-helperText"
              label="address line"
              
              variant="outlined"
            />
              <TextField
              className= "textfield"
              id="outlined-helperText"
              label="landmark"
              
              variant="outlined"
            />
              <TextField
              className= "textfield"
              id="outlined-helperText"
              label="city"
              
              variant="outlined"
            />
              <TextField
              className= "textfield"
              id="outlined-helperText"
              label="country"
              
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </>
  );
}
