import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { VscOrganization } from "react-icons/vsc";
import OrgsModal from "../OrgsModal";

export default function Topnav({ page }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="top-nav">
        <h4 className="title">{page}</h4>
        <div className="icons">
          <icon className="btn" onClick={() => setShow(!show)}>
            <VscOrganization size={20} />
          </icon>
          <icon>
            <IoIosNotifications size={20} />
          </icon>
          <div className="vertical-divider"></div>
          <icon>
            <Avatar />
          </icon>
        </div>
      </nav>
      <OrgsModal show={show} onClose={() => setShow(false)} />
    </>
  );
}
