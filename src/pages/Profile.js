import React, { useEffect, useState } from "react";
import Topnav from "../Components/Navbar/Topnav";
import { Avatar, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarAlert from "../utils/snackbar";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userAction";

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
  const [useremail, setUseremail] = useState("");
  const [avatar, setavatar] = useState();
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");
  const classes = useStyles();
  const [userdata, setuserdata] = useState({});

  const fetchData = async () => {
    const data = await auth.getAccount();

    setuserdata(data);
    setUsername(data.user_metadata.full_name);
    setUseremail(data.email);
    setavatar(data.user_metadata.avatar_url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlesubmit = async(event) => {
    event.preventDefault();

    if (userdata.name == username) {
      setAlertmsg("name is same as before");
      setAlertopen(true);
    } else {
      const { user, error } = await auth.updateUserName(username);
      if (user) {
        setAlertmsg("Name Successfully changed");
        setAlertype("success");
        setAlertopen(true);
      } else {
        setAlertmsg("Name change failed");
        setAlertype("error");
        setAlertopen(true);
      }
    }
  };


  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="main">
        <Topnav page="Profile" />
        <div className="profile-pic">
          <div className="pic-avatar">
            <Avatar className={classes.large} src={avatar}></Avatar>
            <div className=" pic-description">
              <h6> Your Avatar</h6>
              <p> Png or Jpg max size 5mb </p>
            </div>
          </div>
          {/* <input type="file" onChange={filechange}></input> */}
        </div>

        <div className="divider" />

        <div className="details-box shadow ">
          <div className="box-title">Personal details</div>
          <div className="inner-details">
            <form onSubmit={handlesubmit}>
              <div className="row">
                <input
                  className="textfield"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  className="textfield"
                  label="email"
                  value={useremail}
                  disabled
                />
               
              </div>
              <button type="submit" className="save-btn">
                update changes
              </button>
            </form>
          </div>
        </div>

        <div className="details-box shadow">
          <div className="box-title">Other Details</div>
          <div className="inner-details">
            <div className="row">
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="address line"
                variant="outlined"
              />
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="landmark"
                variant="outlined"
              />
            </div>
            <div className="row">
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="city"
                variant="outlined"
              />
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="country"
                variant="outlined"
              />
            </div>
            <button className="save-btn">Save changes</button>
          </div>
        </div>
      </div>
    </>
  );
}
