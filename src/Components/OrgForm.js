import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import "./../styles/forms/orgform.css";
import { createOrg } from "../redux/actions/createOrgAction";
import { useDispatch } from "react-redux";
export default function Dialogform({ open, setOpen }) {

  const [timezones, setTimezones] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const dispatch = useDispatch();

  const getData = () => {
    //fetching list of timezones and country names form public folder
    fetch("data/timezones.json")
      .then((r) => r.json())
      .then(function (myJson) {
        setTimezones([...myJson]);
      });

      fetch("data/countries.json")
      .then((r) => r.json())
      .then(function (myJson) {
        setCountryList([...myJson]);
  
      });
  };

  useEffect(() => {
    //fetching public folder data
    getData();
  }, []);


  const handleClickOpen = () => {
    //open function to open org form modal
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createNewOrg = (e) => {
    //function after filling new organisation form
    e.preventDefault();
    
    console.log("creating new Organisation");
    //dispatching all new org data to create a new organisation
    dispatch(createOrg())
    // handleClose();
  };

  return (
    <div className="orgform">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div class="main-block">
          <form onSubmit={createNewOrg}>
            <h1>Create a New Organisation</h1>
            <fieldset>
              <legend>
                <h3>Organisation Details</h3>
              </legend>
              <div className="account-details">
                <div>
                  <label>Name of Organization *</label>
                  <input type="text" name="name" required />
                </div>
                <div>
                  <label>Type of Organization *</label>
                  <input type="text" name="name" required />
                </div>
              </div>
            </fieldset>
            <fieldset>
              {/* <legend>
                <h3>Organisation Location</h3>
              </legend> */}
              <div className="personal-details">
                <div>
                  <div>
                    <label>Address</label>
                    <input type="text" name="name" />
                  </div>
                  <div>
                    <label>City*</label>
                    <input type="text" name="name" required />
                  </div>
                  <div>
                    <label>Country*</label>
                    <select id="country" name="country">
                      {countryList && 
                      countryList.map((country)=>{
                        return(
                          <option key ={country.code} value ={country.name}>{country.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label>Timezone*</label>
                  <select id="timezone" name="timezone" required>
                    {timezones &&
                      timezones.map((timezone ,index) => {
                        return (
                          <option key={index} value={timezone.offset}>
                            {timezone.text}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </fieldset>

            <button type="submit">Create Organisation</button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
