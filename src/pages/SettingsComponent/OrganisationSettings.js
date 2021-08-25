import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  fetchMembers,
  inviteNewMember,
} from "../../redux/actions/membersAction";
import { useDispatch, useSelector } from "react-redux";
import SnackbarAlert from "../../Components/commanComponents/snackbar";
import Topnav from "../../Components/navbar/Topnav";
import { Button } from "@material-ui/core";

//Organisational settings

const roles = ["admin", "member"];

export default function OrganisationSettings() {
  const [alertmsg, setAlertmsg] = useState("");
  const [alertopen, setAlertopen] = useState(false);
  const [alerttype, setAlerttype] = useState("error");

  // getting current Org Id from redux store
  const { currOrgId, numberofOrgs } = useSelector((state) => ({
    currOrgId: state.organisations.CurrentOrgID,
    numberofOrgs: state.organisations.numberOfOrgs,
  }));

  //getting all Members array form redux store
  const { membersOrg, currentMemberArray, error } = useSelector((state) => ({
    currentMemberArray: [...state.memberships.membershipArray],
    // currentMemberArray : (state.memberships.numberOfMembers > 0) ? [...[...state.memberships.membershipArray].filter((members => members.org_id === currOrgId))] : [],
    error: state.memberships.error,
  }));

  const [selectedRole, setSelectedRole] = useState("Member");
  const dispatch = useDispatch();

  // function to invite new user to current ORG
  const inviteUser = (e) => {
    e.preventDefault();
    const emailId = e.target.email.value;
    const selectedRole = e.target.selectedRole.value;
    const currentOrgId = currOrgId;

    //getting current Organisation name from current Memberships
    const currentOrgName =
      currentMemberArray.length !== 0 ? currentMemberArray[0].org_name : null;

    if (emailId == "" || emailId == null) {
      setAlertmsg("enter a valid Email-id");
      setAlertopen(true);
    } else if (
      currentMemberArray.find((member) => member.user_id === emailId)
    ) {
      setAlertmsg("This email is already a part of this orgaination");
      setAlertopen(true);
    } else if (selectedRole === "" || selectedRole === null) {
      setAlertmsg("Select a valid role");
      setAlertopen(true);
    } else if (currentOrgName === null || currentOrgName === "") {
      setAlertmsg("an error occured , Please try again or Refresh");
      setAlertopen(true);
    } else {
      console.log(emailId, selectedRole, currentOrgId, currentOrgName);
      dispatch(
        inviteNewMember(emailId, selectedRole, currentOrgId, currentOrgName)
      );

    }
  };

  useEffect(() => {
    // fetching all members list
    if (currOrgId !== null) dispatch(fetchMembers(currOrgId));
  }, [currOrgId]);

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="main">
        <Topnav page='Org Settings' />
        <div className="details-box shadow ">
          <div className="inner-details">
            <div className="box-title">Invite new member</div>
            <form onSubmit={inviteUser}>
              <div className="row">
                <div className="row-div">
                  <p className="info-txt">
                    <AiOutlineExclamationCircle /> Invited member must have an
                    existing account.
                  </p>

                  <p className="info-txt">
                    <AiOutlineExclamationCircle /> One member can have only one
                    role.
                  </p>
                </div>

                <div className="row-div mid-details-box">
                  <input name="email" type="email" placeholder="email"></input>
                  <div>
                    <FormLabel component="legend"> Select role</FormLabel>
                    <RadioGroup
                      onChange={(e) => setSelectedRole(e.target.value)}
                      aria-label="gender"
                      name="selectedRole"
                      value={selectedRole}
                    >
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                      <FormControlLabel
                        value="member"
                        control={<Radio />}
                        label="Member"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <button type="submit" className="save-btn">
                Invite
              </button>
            </form>
          </div>
        </div>
        <div className="mid-details-box">
          <div className="title"> All members</div>

          {!currentMemberArray.length && (
            <div>No Members in this Organisation</div>
          )}
          {currentMemberArray.map((members) => {
            return (
              <div key={members.ID} className="org-box">
                <div className="email">{members.user_id}</div>
                <div className="role">{members.role}</div>
                <div>{}</div>
              </div>
            );
          })}
        </div>

        <div className='center details-box'>
          <Button 
           variant="contained"
          color="secondary" >
            Leave Organisation
          </Button>
        </div>
      </div>
    </>
  );
}
