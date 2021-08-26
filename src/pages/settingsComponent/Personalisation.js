import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useSelector, useDispatch } from "react-redux";

import {
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from "../../redux/CONSTANTS";

const languages = ["English", "Hindi"];
const themes = ["dark", "light"];

export default function Personalisation({ auth }) {
  const themestate = useSelector((state) => state);
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState(themestate.theme);
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

  useEffect(() => {
    if (theme == "light")
      dispatch({
        type: SET_LIGHT_THEME,
      });

    if (theme == "dark")
      dispatch({
        type: SET_DARK_THEME,
      });
  }, [theme]);

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
}
