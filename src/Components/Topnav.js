import React from "react";
import {IoIosNotifications} from "react-icons/io"

export default function Topnav({ page }) {
  return (

      <nav className= "top-nav">
        <h4 className="title">{page}</h4>
        <div>
            <IoIosNotifications/>
        </div>
      </nav>

  );
}
