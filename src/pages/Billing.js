import React, { useState } from "react";
import Topnav from "../Components/Topnav";
import { BasicTable } from "../utils/table";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./../styles/Dashboard/billing.css";
import { RiMastercardFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

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

const onSubmit = () => {
 
};

export default function Billing() {
  const [currency, setCurrency] = React.useState("EUR");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const [openform, setOpenform] = useState(false);
  const [newcard, setNewcard] = useState({
    name: "",
    number: "",
    exp: "",
    cvv: "",
  });

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
              <button className="grey-btn" onClick={() => setOpenform(true)}>
                Add new Card
              </button>
              <button className="grey-btn">Create Card</button>
            </div>
            {openform && (
              <Dialogform
                open={openform}
                setOpen={setOpenform}
                onSubmit={onSubmit}
                newcard={newcard}
                setNewcard={setNewcard}
              />
            )}
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

function Dialogform({ open, setOpen, handleSubmit }) {
  const [step, setStep] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Create New Organisation
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText> */}
          <div className="divider"></div>
          <input placeholder="Organisation name"></input>
          <input placeholder="address"></input>
          <input placeholder="city"></input>
          <input placeholder="country"></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setStep(step + 1)} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
