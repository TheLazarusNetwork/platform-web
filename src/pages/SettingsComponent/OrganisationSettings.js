import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { BasicTable } from "../../utils/table";

//Organisational settings

const roles = ["admin", "member"];

export default function OrganisationSettings() {
  const [role, setRole] = useState("");
  let value;
  const handleChange = () => {};
  
  return (
    <>
      <div className="flex-div">
        <div className="mid-details-box shadow">
          <div className="title"> Invite new member</div>
          <form>
            <input type="email" placeholder="email"></input>
            <div>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
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
        <div className='mid-details-box shadow'>
            <div className='title'>Invited Members</div>
            <div className='org-box'>
                <div className='email'>email@laskfj</div>
                <div className='role'>role</div>
            </div>
            <div className='org-box'>
                <div className='email'>email@laskfj</div>
                <div className='role'>role</div>
            </div>
            <div className='org-box'>
                <div className='email'>email@laskfj</div>
                <div className='role'>role</div>
            </div>
        </div>
      </div>
      <div className='mid-details-box'>
          <div className='title'> All members</div>
          <BasicTable/>
      </div>
    </>
  );
}
