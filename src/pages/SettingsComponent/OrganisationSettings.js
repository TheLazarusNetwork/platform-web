import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { BasicTable } from "../../utils/table";
import {
  fetchMembers,
  inviteNewMember,
} from "../../redux/actions/membersAction";
import { useDispatch, useSelector } from "react-redux";
import SnackbarAlert from "../../utils/snackbar";

//Organisational settings

const roles = ["admin", "member"];

export default function OrganisationSettings() {
  const [alertmsg, setAlertmsg] = useState("");
  const [alertopen, setAlertopen] = useState(false);
  const [alerttype, setAlerttype] = useState("error");

  // getting current Org Id from redux store
  const { currOrgId } = useSelector((state) => ({
    currOrgId: state.organisations.CurrentOrgID,
  }));
  //getting all Members array form redux store
  const { membersOrg,currentMemberArray, error } = useSelector((state) => ({
    membersOrg: [...state.memberships.membershipArray],
    currentMemberArray : (state.memberships.numberOfMembers > 0) ? [...[...state.memberships.membershipArray].filter((members => members.org_id === currOrgId))] : [],
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
    console.log(currentMemberArray.length === 0);

    const currentOrgName =
      currentMemberArray.length !== 0
        ? currentMemberArray.find((member) => member.org_id === currOrgId)
            .org_name
        : null;

    if (emailId === "" || emailId === null) {
      setAlertmsg("enter a valid Email-id");
      setAlertopen(true);
    }
    else if(currentMemberArray.find(member => member.user_id === emailId)){
          setAlertmsg('This email is already a part of this Orgaination');
          setAlertopen(true)
    }
    else if (selectedRole === "" || selectedRole === null) {
      setAlertmsg("Select a valid role");
      setAlertopen(true);
    }
    else if (currentOrgName === null) {
      setAlertmsg("an error occured , Please try again or Refresh");
      setAlertopen(true);
    } else
      dispatch(inviteNewMember(emailId, selectedRole, currentOrgId, currentOrgName));
    console.log(emailId, selectedRole);
  };

  useEffect(() => {
    // fetching all members list
    dispatch(fetchMembers());
  }, []);

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="flex-div">
        <div className="details-box shadow">
          <div className="title"> Invite new member</div>
          <form onSubmit={inviteUser}>
            <input name="email" type="email" placeholder="email"></input>
            <div>
              <FormLabel component="legend">Role</FormLabel>
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
            <button type="submit">send invite</button>
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
    </>
  );
}
