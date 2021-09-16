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
import { GoKebabVertical } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import SnackbarAlert from "../../Components/commanComponents/snackbar";
import Topnav from "../../Components/navbar/Topnav";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { useGetOrgs } from "../../hooks/orgHooks";

//Organisational settings

const roles = ["admin", "member"];

export default function OrganisationSettings() {
  const [alertmsg, setAlertmsg] = useState("");
  const [alertopen, setAlertopen] = useState(false);
  const [alerttype, setAlerttype] = useState("error");

  // getting current Org Id from redux store
  const [numberofOrgs,currentOrgID,orgArray,orgloading] = useGetOrgs()

  //getting all Members array form redux store
  const { membersOrg, currentMemberArray, error } = useSelector((state) => ({
    currentMemberArray: [...state.memberships.membershipArray],
    // currentMemberArray : (state.memberships.numberOfMembers > 0) ? [...[...state.memberships.membershipArray].filter((members => members.org_id === currentOrgID))] : [],
    error: state.memberships.error,
  }));

  const [selectedRole, setSelectedRole] = useState("Member");
  const dispatch = useDispatch();

  // function to invite new user to current ORG
  const inviteUser = (e) => {
    e.preventDefault();
    const emailId = e.target.email.value;
    const selectedRole = e.target.selectedRole.value;
    const currentOrgId = currentOrgID;

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
    if (currentOrgID !== null) dispatch(fetchMembers(currentOrgID));
  }, [currentOrgID]);

  //for each member options menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  //funtion to remove a member from current org
  const removeMember = () => {
    //function to change current membership role
  };
  const changeRole = (currentRole,email) => {
    const newRole = currentRole === "member" ? "admin" : "member";
    
  };

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="main">
        <Topnav page="Org Settings" />
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
          {currentMemberArray.map((member) => {
            if (member.role === "owner")
              return (
                <div key={member.ID} className="org-box">
                  <div className="email">{member.user_id}</div>
                  <div className="role">{member.role}</div>
                  <div />
                </div>
              );

            return (
              <div key={member.ID} className="org-box">
                <div className="email">{member.user_id}</div>
                <div className="role">{member.role}</div>
                <div>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                  >
                    <GoKebabVertical />
                  </IconButton>
                  <Menu
                    id={member.ID}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {/* <MenuItem onClick={removeMember}>Remove member </MenuItem> */}
                    <MenuItem onClick={changeRole(member.role)}>
                      change role
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            );
          })}
        </div>

        <div className="center details-box">
          <Button variant="contained" color="secondary">
            Leave Organisation
          </Button>
        </div>
      </div>
    </>
  );
}
