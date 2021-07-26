import React, { useState } from "react";
import Dialogform from "./OrgForm";


export default function NoOrganisations() {
  const [openform, setOpenform] = useState(false);

  const openCreateOrgForm = () => {
    setOpenform(true);
  };
  
  return (
    <div className="center details-box">
      <div className="center">
        <h2>You are not a part of any Organisations</h2>
        <p className="center">Create a New Organisation</p>
      </div>
      <button onClick={openCreateOrgForm}>Create New Organisation</button>
      {openform && <Dialogform open={openform} setOpen={setOpenform} />}

    </div>
  );
}
