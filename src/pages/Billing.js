import React from "react";
import Topnav from "../Components/Topnav";
import { BasicTable } from "../utils/table";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./../styles/Dashboard/billing.css";
import { RiMastercardFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

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
    value: "JPY",
    label: "¥",
  },
];

export default function Billing() {
  const [currency, setCurrency] = React.useState("EUR");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
      <div className="main">
        <Topnav page="Billing" />
        <div className="flex-div">
          <div className="table  mid-details-box">
            <div className="table-top">
              <div className="title"> Transaction History</div>
              <TextField
                id="standard-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="divider"></div>
            <div className="mid-details-box shadow">
              <div className="filters">
                <TextField
                  id="standard-select-currency"
                  select
                  value={currency}
                  onChange={handleChange}
                  helperText="Time"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>{" "}
                <TextField
                  id="standard-select-currency"
                  select
                  value={currency}
                  onChange={handleChange}
                  helperText="Service "
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <BasicTable />
            </div>
          </div>
          <div className="mid-details-box ">
            <div className="title">My Cards</div>
            <div>
              <button className="grey-btn">Add new Card</button>
              <button className="grey-btn">Create Card</button>
            </div>
            <div className="cards">
              <div className="card">
                <div>Card Holder's name</div>
                <icon className="card-icon">
                  <RiMastercardFill />
                </icon>
                <icon className="card-delete">
                  <MdDelete />
                </icon>
                <p> xxxx-xxxx-xxxx-1234</p>
                
              </div>
              <div className="card">
                <div>Card Holder's name</div>
                <icon className="card-icon">
                  <RiMastercardFill />
                </icon>
                <icon className="card-delete">
                  <MdDelete />
                </icon>
                <p> xxxx-xxxx-xxxx-1234</p>
                
              </div>
              <div className="card">
                <div>Card Holder's name</div>
                <icon className="card-icon">
                  <RiMastercardFill />
                </icon>
                <icon className="card-delete">
                  <MdDelete />
                </icon>
                <p> xxxx-xxxx-xxxx-1234</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
