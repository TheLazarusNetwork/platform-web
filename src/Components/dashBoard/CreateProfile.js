import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/forms/orgform.css";
import { createUser } from "./../../redux/actions/userAction";
import SnackbarAlert from "../commanComponents/snackbar";
import ErrorAlert from "../commanComponents/errorAlert";

export default function CreateProfile({ error }) {
  const [countryList, setCountryList] = useState(null);
  const [alertmsg, setAlertmsg] = useState("");
  const [alertopen, setAlertopen] = useState(false);
  const [alerttype, setAlerttype] = useState("error");
  const dispatch = useDispatch();

  const getData = () => {
    //fetching list of country names form public folder
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

  const createNewUser = (e) => {
    //function after filling new organisation form
    e.preventDefault();
    console.log("creating new User");

    const City = e.target.City.value;
    const Country = e.target.Country.value;
    const ContactNumber = e.target.ContactNumber.value;

    console.log(ContactNumber.length !== 10 && ContactNumber.length !== 0);
    if (ContactNumber.length !== 10 && ContactNumber.length !== 0) {
      setAlertmsg("Please enter a valid contact number");
      setAlertopen(true);
    } else {
      //dispatching all new org data to create a new organisation
      dispatch(createUser(City, Country, ContactNumber));
    }
    // handleClose();
  };

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      {error && <ErrorAlert message={error.message} alertopen={"true"} />}
      <div className=" main">
        <div className=" center main-block">
          <form onSubmit={createNewUser}>
            <h1>Please complete your profile </h1>
            <fieldset>
              <div className="personal-details">
                <div>
                  <div>
                    <label>Contact Number</label>
                    <input
                      type="number"
                      name="ContactNumber"
                      minLength="10"
                      maxLength="10"
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input type="text" name="City" />
                  </div>
                  <div>
                    <label>Country</label>
                    <select id="country" name="Country">
                      {countryList &&
                        countryList.map((country) => {
                          if (country.name === "United States")
                            return (
                              <option
                                key={country.code}
                                value={country.name}
                                selected
                              >
                                {country.name}
                              </option>
                            );
                          return (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="button-flex-div">
              <button className='button' type="submit">Confirm </button>
              <button className='button grey-btn' type="submit">Skip for now</button>
            </div>
          </form>
        </div>
        <p className="center">if you already have an account, please refresh</p>
      </div>
    </>
  );
}
