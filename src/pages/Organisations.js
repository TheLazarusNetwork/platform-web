import React, { useEffect, useState } from "react";
import Topnav from "../Components/navbar/Topnav";
import "./../styles/Organisation/organisation.css";
import { BiRightTopArrowCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { GoKebabVertical } from "react-icons/go";
import Dialogform from "../Components/organisationsPage/OrgForm";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentOrg } from "../redux/actions/orgAction";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";

export default function Organisations() {
  //create org form open or close
  const [openform, setOpenform] = useState(false);
  
  //all organisations user is part of
  const { orgArray, currentOrgID } = useSelector((state) => ({
    orgArray: [...state.organisations.orgArray],
    currentOrgID: state.organisations.CurrentOrgID,
  }));
  const [currOrg, setCurrOrg] = useState();
  const dispatch = useDispatch();

  const changeOrg = (id) => {
    dispatch(changeCurrentOrg(id));
  };

  const getcurrentOrg = () => {
    let currentOrg = orgArray.find((org) => org.id === currentOrgID);
    setCurrOrg(currentOrg);
    console.log(currentOrg);
  };

  useEffect(() => {
    getcurrentOrg();
  }, [currentOrgID]);

  return (
    <>
      {/* <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      /> */}
      <div className="main">
        <Topnav page="Profile" />
        <div>
          <div className="top-div">
            <div className="main-title">All Organisations</div>
            <div>
              <button
                className="grey-btn"
                onClick={() => {
                  setOpenform(!openform);
                }}
              >
                Create new Organisation
              </button>
            </div>
          </div>
          <div className="divider"></div>

          <div className="current-org  mid-details-box">
            <div className=" tag">Current Organisation</div>

            {currOrg && (
              <div className="org-box">
                <div className="name">{currOrg.name}</div>
                <div className="country">{currOrg.country}</div>
                <div>
                  <Link to="/dash/organisationSettings">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<FiSettings />}
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="table mid-details-box">
            <div className="tag"> All Organisation</div>

            {orgArray.map((organisation) => {
              return (
                <div key={organisation.id} className="org-box">
                  <div className="name">{organisation.name}</div>
                  <div className="country">{organisation.country}</div>
                  <div className="buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<BiRightTopArrowCircle />}
                      onClick={() => changeOrg(organisation.id)}
                    >
                      Org
                    </Button>

                    <Link to="/dash/organisationSettings">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiSettings />}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {openform && <Dialogform open={openform} setOpen={setOpenform} />}
      </div>
    </>
  );
}
