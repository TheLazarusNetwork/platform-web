import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import {
  FaUserLock,
  FaShieldAlt,
  FaFileInvoice,
  FaUser,
  FaCloud,
  FaDungeon,
  FaCog,
  FaColumns,
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../../redux/actions/userAction";
// import 'react-pro-sidebar/dist/css/styles.css';
import "./../../styles/Dashboard/dashboard.css";
import "./../../styles/Navbar/navbar.scss";
import { fetchOrg } from "../../redux/actions/orgAction";
import { userLogout } from "../../redux/rootReducer";

const Sidebar = ({ auth }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { loading, error, userData, theme, isUserLoggedIn } = useSelector(
    (state) => ({
      userData: state.user.currentUserData,
      loading: state.user.loading,
      error: state.user.error,
      theme: state.theme,
      isUserLoggedIn: state.user.isUserLoggedIn,
    })
  );

  const { organisationList, numberOfOrgs } = useSelector((state) => ({
    organisationList: [...state.organisations.orgArray],
    numberOfOrgs: state.organisations.numberOfOrgs,
  }));


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchOrg());
  }, []);

  const history = useHistory();

  const signOutUser = async () => {
    const { error } = await auth.logout();
    if (error) console.log(error);
    dispatch(userLogout())
    history.push("/signup");
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
      <ProSidebar collapsed={sidebarCollapsed}>
        <SidebarHeader>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              icon={<GiHamburgerMenu />}
            >
              SideBar
            </MenuItem>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square" >
            <MenuItem title="Dashboard" icon={<FaColumns />}>
              Dashboard
              <Link to="/dash/" />
            </MenuItem>

            {isUserLoggedIn && numberOfOrgs ? (
              <>
                <MenuItem title="AVPN" icon={<FaUserLock />}>
                  Anonymous VPN
                  <Link to="/dash/anomvpn" />
                </MenuItem>

                <MenuItem title="DVPN" icon={<FaShieldAlt />}>
                  Dedicated VPN
                  <Link to="/dash/dedivpn" />
                </MenuItem>

                <MenuItem title="Tunnel" icon={<FaDungeon />}>
                  Tunnel
                  <Link to="/dash/tunnel" />
                </MenuItem>

                <MenuItem title="Cloud" icon={<FaCloud />}>
                  Cloud
                  <Link to="/dash/cloud" />
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem title="AVPN" className='disabled'  icon={<FaUserLock color='grey' />}>
                  Anonymous VPN
                 
                </MenuItem>

                <MenuItem title="DVPN" className='disabled' icon={<FaShieldAlt color='grey' />}>
                  Dedicated VPN
                
                </MenuItem>

                <MenuItem title="Tunnel" className='disabled' icon={<FaDungeon color='grey' />}>
                  Tunnel
              
                </MenuItem>

                <MenuItem title="Cloud" className='disabled' icon={<FaCloud color='grey' />}>
                  Cloud
                
                </MenuItem>
              </>
            )}
            <MenuItem title="Profile" icon={<FaUser />}>
              Profile
              <Link to="/dash/profile" />
            </MenuItem>
            <MenuItem title="Billing" icon={<FaFileInvoice />}>
              Billing
              <Link to="/dash/billing" />
            </MenuItem>
            <MenuItem title="Settings" icon={<FaCog />}>
              Settings
              <Link to="/dash/settings" />
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem
              onClick={() => {
                signOutUser();
              }}
              icon={<BiLogOut />}
            >
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;

// <CDBSidebar className="sidebar">
// <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//   <a
//     href="/dash/"
//     className="text-decoration-none"
//     style={{ color: "inherit" }}
//   >
//     Sidebar
//   </a>
// </CDBSidebarHeader>

// <CDBSidebarContent className="sidebar-content">
//   <CDBSidebarMenu className="sidebar-menu">
//     <NavLink exact to="/dash/" activeClassName="activeClicked">
//       <CDBSidebarMenuItem className="menuitem" icon="columns">
//         Dashboard
//       </CDBSidebarMenuItem>
//     </NavLink>

// {// hide/disable all services links until user is logged in
// isUserLoggedIn ?
//     <div className='active-links'>
//       <div className="label"> Services</div>

//       <NavLink exact to="/dash/anomvpn" activeClassName="activeClicked">
//         <CDBSidebarMenuItem className="menuitem" icon="user-lock">
//           Anonymous VPN
//         </CDBSidebarMenuItem>
//       </NavLink>
//       <NavLink exact to="/dash/dedivpn" activeClassName="activeClicked">
//         <CDBSidebarMenuItem className="menuitem" icon="shield-alt">
//           Dedicated Network
//         </CDBSidebarMenuItem>
//       </NavLink>
//       <NavLink exact to="/dash/cloud" activeClassName="activeClicked">
//         <CDBSidebarMenuItem className="menuitem" icon="cloud">
//           Cloud
//         </CDBSidebarMenuItem>
//       </NavLink>
//       <NavLink exact to="/dash/tunnel" activeClassName="activeClicked">
//         <CDBSidebarMenuItem className="menuitem" icon="dungeon">
//           Tunnel
//         </CDBSidebarMenuItem>
//       </NavLink>
//     </div>
//     :
//       <div className='inactive-links'>
//     <div className="label"> Services</div>

//       <CDBSidebarMenuItem className="menuitem" icon="user-lock" iconClassName ="disabled" >
//         Anonymous VPN
//       </CDBSidebarMenuItem>

//       <CDBSidebarMenuItem className="menuitem" icon="shield-alt">
//         Dedicated Network
//       </CDBSidebarMenuItem>

//       <CDBSidebarMenuItem className="menuitem" icon="cloud">
//         Cloud
//       </CDBSidebarMenuItem>

//       <CDBSidebarMenuItem className="menuitem" icon="dungeon">
//         Tunnel
//       </CDBSidebarMenuItem>

//   </div>
// }

//     <div className="label"> User </div>

//     <NavLink exact to="/dash/profile" activeClassName="activeClicked">
//       <CDBSidebarMenuItem className="menuitem" icon="user">
//         Profile
//       </CDBSidebarMenuItem>
//     </NavLink>
//     <NavLink exact to="/dash/billing" activeClassName="activeClicked">
//       <CDBSidebarMenuItem className="menuitem" icon="file-invoice">
//         Billing
//       </CDBSidebarMenuItem>
//     </NavLink>
//     <NavLink exact to="/dash/settings" activeClassName="activeClicked">
//       <CDBSidebarMenuItem className="menuitem" icon="cog">
//         Settings
//       </CDBSidebarMenuItem>
//     </NavLink>
//   </CDBSidebarMenu>
// </CDBSidebarContent>

// <CDBSidebarFooter style={{ textAlign: "center" }}>
//   <div className="logout-btn">
//     <button
//       type="button"
//       onClick={signOutUser}
//       className="btn btn-dark"
//     >
//       <BiLogOut />
//       <span>Logout</span>
//     </button>
//   </div>
// </CDBSidebarFooter>
// </CDBSidebar>/
