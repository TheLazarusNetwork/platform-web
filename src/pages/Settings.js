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

export default function Settings() {
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
          <Personalisation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Security />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Page Three
        </TabPanel>
      </div>
    </div>
  );
}

//personalisation page
const languages = ["English", "Hindi"];
const themes = ["dark", "light"];

const Personalisation = () => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light ");
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

const Security = () => {
  const [auth, setAuth] = useState({
    checkedA: true,
  });

  const handleswitchChange = (event) => {
    setAuth({
      ...auth,
      [event.target.name]: event.target.checked,
    });
  };
  const handlepasswordchange =()=>{

  }

  return (
    <>
      <div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <form>
            <div className="box-title">Change Password</div>
            <div className="row">
              <div className="row-div">
                <p className="info-txt">
                  <AiOutlineExclamationCircle /> New password must be different
                  from old password
                </p>

                <p className="info-txt">
                  <AiOutlineExclamationCircle /> Password must be atleast 6
                  characters
                </p>
              </div>
              <div className="row-div">
                <input id='password' placeholder="current password"></input>
                <input id='newpassword' placeholder="new password"></input>
                <input id='cpassword' placeholder="confirm new password"></input>
              </div>
            </div>
            <button onClick={handlepasswordchange} className="save-btn">save changes</button>
            </form>
          </div>
        </div>
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="box-title">2 Factor Authentication</div>
            <div className="row">
              <div className="row-div">
                <p className="info-txt">
                  Settings up 2 factor authentication makes your account more
                  secure
                </p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth.checkedA}
                    onChange={handleswitchChange}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Setup 2 factor Auth"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
