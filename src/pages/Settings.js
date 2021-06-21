import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Topnav from "../Components/Topnav";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BasicTable, StickyHeadTable } from "../utils/table";
import Passwordbreach from "../Components/Passwordbreach";
import SnackbarAlert from "../utils/snackbar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Settings({auth}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main">
      <Topnav page="Settings" />
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Personalisation" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Security" href="/trash" {...a11yProps(1)} />
            <LinkTab
              label="Organisation Settings"
              href="/spam"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Personalisation auth={auth} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Security auth ={auth}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
         <OrganisationSettings auth ={auth}/>
        </TabPanel>
      </div>
    </div>
  );
}

//personalisation page
const languages = ["English", "Hindi"];
const themes = ["dark", "light"];

const Personalisation = ({auth}) => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handlelanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handlethemechange = (event) => {
    setTheme(event.target.value);
  };
  const handleswitchChange = (event) => {
    setNotification({
      ...notification,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="row">
              <div className="box-title">Change Language</div>
              <TextField
                id="standard-select-language"
                select
                label=" "
                value={language}
                onChange={handlelanguageChange}
                helperText="Please select your currency"
              >
                {languages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row">
              <div className="box-title">Change Theme</div>
              <TextField
                id="standard-select-theme"
                select
                label=" "
                value={theme}
                onChange={handlethemechange}
                helperText="Please select your theme"
              >
                {themes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="box-title">Notification Settings</div>
            <div className="row">
              <FormControlLabel
                control={
                  <Switch
                    checked={notification.checkedA}
                    onChange={handleswitchChange}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Allow Browser Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notification.checkedB}
                    onChange={handleswitchChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Recieve Montly Newsletter"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//security page

const Security = ({auth}) => {
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error")
  const [password, setPassword] = useState(" "); //for checking the password strength using password strength meter
  const [mfauth, setMfauth] = useState({
    checkedA: true,
  });

  const handleswitchChange = (event) => {
   setMfauth({
      ...mfauth,
      [event.target.name]: event.target.checked,
    });
  };

  const handlepasswordchange = async(event) => {
    event.preventDefault();
    var currentpassword = event.target.elements["currentpassword"].value;
    var newpassword = event.target.elements["newpassword"].value;
    var repassword = event.target.elements["repeatpassword"].value;

    if (newpassword.toString().length < 7) {
      // show alert if password length is less than 7 or both password do not match
      setAlertype("error")
      setAlertmsg("password should be at least 6 letters");
      setAlertopen(true);
    } else if (newpassword !== repassword) {
      {
        setAlertype('error')
        setAlertmsg("passwords do not match");
        setAlertopen(true);
      }
    } else {
     const passwordchanged = await auth.updatePassword(newpassword,currentpassword);
     if(passwordchanged)
     {
       setAlertype('success');
       setAlertmsg("password Changed successfully")
       setAlertopen(true);
     }
     else{
      setAlertype('error');
      setAlertmsg("password Changed unsuccessful")
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
      <div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="box-title">Change Password</div>
            <form onSubmit={handlepasswordchange}>
              <div className="row">
                <div className="row-div">
                  <p className="info-txt">
                    <AiOutlineExclamationCircle /> New password must be
                    different from old password
                  </p>

                  <p className="info-txt">
                    <AiOutlineExclamationCircle /> Password must be atleast 6
                    characters
                  </p>
                </div>

                <div className="row-div">
                  <input
                    type="password"
                    placeholder="current password"
                    id="currentpassword"
                  ></input>
                  <input
                    id="newpassword"
                    type="password"
                    placeholder="new password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                  <input
                    id="repeatpassword"
                    type="password"
                    placeholder="confirm new password"
                  ></input>
                  <Passwordbreach password={password} />
                </div>
              </div>
              <button type="submit" className="save-btn">
                save changes
              </button>
            </form>
          </div>
        </div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="box-title">Multi Factor authentication</div>
            <div className="row">
              <div className="row-div">
                <p className="info-txt">
                  Settings up multifactor mfaauthentication makes your account more
                  secure
                </p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={mfauth.checkedA}
                    onChange={handleswitchChange}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Setup Multifactor auth"
              />
            </div>
          </div>
        </div>

        <div className="details-box shadow ">
          <div className="inner-details">
            <form>
              <div className="box-title">Contact Information</div>
              <div className="row">
                <div className="row-div">
                  <p className="info-txt">
                    <AiOutlineExclamationCircle /> this email /contact will be
                    used for 2 factor mfaauthentication
                  </p>
                </div>
                <div className="row-div">
                  <input
                    id="contact"
                    type="tel"
                    placeholder="contact number"
                  ></input>
                  <input id="email" type="email" placeholder="email"></input>
                </div>
              </div>
              <button onClick={handlepasswordchange} className="save-btn">
                save changes
              </button>
            </form>
          </div>
        </div>

        <div className="table-div">
          <StickyHeadTable />
        </div>
      </div>
    </>
  );
};


//Organisational settings
 const OrganisationSettings =()=>{

 }