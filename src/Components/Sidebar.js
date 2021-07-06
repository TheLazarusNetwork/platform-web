import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { BiLogOut } from "react-icons/bi";
import "./../styles/Dashboard/dashboard.css";
import { NavLink, useHistory } from "react-router-dom";

const Sidebar = ({ auth }) => {
  const history = useHistory();

  const signOutUser = async () => {
    const logoutsuccess = await auth.logout();
    if (logoutsuccess) history.push("/signup");
    
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        left: "0",
      }}
    >
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/dash/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="sidebar-menu">
            <NavLink exact to="/dash/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="columns">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            <div className="label"> Services</div>

            <NavLink exact to="/dash/anomvpn" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="user-lock">
                Anonymous VPN
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dash/dedivpn" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="shield-alt">
                Dedicated Network
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dash/cloud" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="cloud">
                Cloud
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dash/tunnel" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="dungeon">
                Tunnel
              </CDBSidebarMenuItem>
            </NavLink>

            <div className="label"> User </div>

            <NavLink exact to="/dash/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="user">
                Profile
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dash/billing" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="file-invoice">
                {"  "}Billing
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dash/settings" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="cog">
                Settings
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="logout-btn">
            <button
              type="button"
              onClick={signOutUser}
              className="btn btn-dark"
            >
              <BiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
