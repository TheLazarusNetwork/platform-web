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
import { NavLink } from "react-router-dom";

const Sidebar = ({ auth }) => {
  const signOutUser = () => {
    auth.logout();
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
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="sidebar-menu">
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="columns">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            <div className="label"> Services</div>

            <NavLink exact to="/anomvpn" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="user-lock">
                Anonymous VPN
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dedivpn" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="shield-alt">
                Dedicated Network
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/cloud" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="cloud">
                Cloud
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tunnel" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="dungeon">
                Tunnel
              </CDBSidebarMenuItem>
            </NavLink>

            <div className="label"> User </div>

            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="user">
                Profile
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/billing" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="menuitem" icon="file-invoice">
                {"  "}Billing
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/settings" activeClassName="activeClicked">
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
