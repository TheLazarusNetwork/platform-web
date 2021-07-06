import React, { useEffect, useState } from "react";
import Topnav from "../Components/Topnav";
import { Avatar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../Components/Dialog";
import SnackbarAlert from "../utils/snackbar";

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
  const [password, setPassword] = useState("");
  const [avatar, setavatar] = useState();
  const [diopen, setDiopen] = useState(false);
  const [update, setupdate] = useState(false);
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");
  const classes = useStyles();
  const [userdata, setuserdata] = useState({});

  const fetchData = async () => {
    // fetch user data by calling the getAccount function and show user's name and email 
    const data = await auth.getAccount();

    setuserdata(data);
    setUsername(data.name);
    setUseremail(data.email);
  };

  useEffect(() => {
    //fetch user data when the page lodes
    fetchData();
  }, []);

  const handlesubmit = (event) => {
    //funtion to change the user name or user email
    event.preventDefault();

    if (userdata.name == username && userdata.email == useremail) {
      setAlertmsg("Email and name are same");
      setAlertopen(true);
    } else {
      // open the dialog to get user's password 
      setDiopen(true);
      setupdate(false);
    }
  };

  useEffect(async () => {
    if (update) {
      if (username != userdata.name) {
        console.log(`"${username}"` );
        const nameupdate = await auth.updatename(username);
        if(nameupdate)
        {
          setAlertmsg("Name Successfully changed");
          setAlertype("success");
          setAlertopen(true);
        }
        else{
          setAlertmsg("Name change failed")
          setAlertype("error")
          setAlertopen(true)
        }
      }
      if (useremail != userdata.email) {
        
        const emailupdate = await auth.updateemail(useremail , password);
      }
    }
  }, [update]);

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
        <Dialog
          diopen={diopen}
          setDiopen={setDiopen}
          setPassword={setPassword}
          setUpdate={setupdate}
        />
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

        <div className="details-box shadow ">
          <div className="box-title">Personal details</div>
          <div className="inner-details">
            <form onSubmit={handlesubmit}>
              <div className="row">
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
                <input
                  className="textfield"
                  label="email"
                  value={useremail}
                  onChange={(e) => {
                    setUseremail(e.target.value);
                  }}
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
