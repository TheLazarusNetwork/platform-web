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
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "ETH",
    label: "Ξ",
  },
];

export default function Personalisation({ auth }) {
  const themestate = useSelector((state) => state);
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState(themestate.theme);
  const [currency, setCurrency] = useState("USD");
  const [notification, setNotification] = useState({
    checkedA: false,
    checkedB: false,
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
  const handlecurrencychange =(e) =>{
    setCurrency(e.target.value)
  }

  return (
    <>
      <div>
        <div className="details-box shadow ">
          <div className="inner-details">
                   {/* language select dropdown */}
            <div className="row">
              <div className="box-title">Change Language</div>
              <TextField
                id="standard-select-language"
                select
                label=" "
                value={language}
                onChange={handlelanguageChange}
                helperText="Please select your language"
              >
                {languages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
                   {/* theme select dropdown */}
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

            {/* currency select dropdown */}
            <div className="row">
              <div className="box-title">Change Currency</div>
              <TextField
                id="standard-select-theme"
                select
                label=" "
                value={currency}
                onChange={handlecurrencychange}
                helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}{" "}{option.value}
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
                  disabled
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
                  disabled
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
