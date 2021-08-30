import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import "../../styles/forms/orgform.css";
import { createOrg } from "../../redux/actions/createOrgAction";
import { useDispatch } from "react-redux";
import { fetchOrg } from "../../redux/actions/orgAction";
import ErrorAlert from "../commanComponents/errorAlert";
import SnackbarAlert from "../commanComponents/snackbar";


export default function Dialogform({ open, setOpen }) {

  const [timezones, setTimezones] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const dispatch = useDispatch();

  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");


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
    const OrgName = e.target.OrgName.value;
 
    const OrgType = e.target.OrgType.value;
    const Country = e.target.Country.value;
    const Timezone = e.target.Timezone.value;

    const orgName = OrgName.toString()
    console.log(orgName, orgName.length)
    if(orgName.length <5  || orgName.length> 30)
    {
       setAlertmsg("Min Org name length : 5")
       setAlertype('error')
       setAlertopen(true)
    }
    if(orgName.length> 30)
    {
       setAlertmsg("Max Org name length : 30")
       setAlertype('error')
       setAlertopen(true)
    }
    else
   { //dispatching all new org data to create a new organisation
    dispatch(createOrg(OrgName,OrgType,Country,Timezone))
    handleClose();}
  };

  return (
    <div className="orgform">
         <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
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
                  
                  <input type="text" name="OrgName" required maxLength="30" minLength='5'/>
                </div>
                <div>
                  <label>Type of Organization *</label>
                  
                  <select name='OrgType'>
                    <option  value='private'>private</option>
                    <option value= 'llc'>llc</option>
                  </select>
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
                    <input type="text" name="address" />
                  </div>
                  <div>
                    <label>City*</label>
                    <input type="text" name="OrgCity" required />
                  </div>
                  <div>
                    <label>Country*</label>
                    <select id="country" name="Country">
                      {countryList && 
                      countryList.map((country)=>{
                        if(country.name ==='United States')
                        return <option key={country.code} value= {country.name} selected>{country.name}</option>
                        return(
                          <option key ={country.code} value ={country.name}>{country.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label>Timezone*</label>
                  <select id="timezone" name="Timezone" required>
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
