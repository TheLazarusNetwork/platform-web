import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdSwapHoriz } from "react-icons/md";
import OrgsModal from "../OrgsModal";
import Button from '@material-ui/core/Button'

export default function Topnav({ page }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="top-nav">
        <h4 className="title">{page}</h4>
        <div className="icons">
          <Button 
          variant ='contained'
          color='primary'
          startIcon ={<MdSwapHoriz/>}
           onClick={() => setShow(!show)}
            > Org
          </Button>
          <icon>
            <IoIosNotifications size={25} />
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
