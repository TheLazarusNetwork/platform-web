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
import { BiLogOut } from "react-icons/bi";
import {
  FaUserLock,
  FaShieldAlt,
  FaFileInvoice,
  FaUser,
  FaBuilding,
  FaCloud,
  FaDungeon,
  FaCog,
  FaColumns,
  FaWallet
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../../redux/actions/userAction";
import "./../../styles/Dashboard/dashboard.css";
import "./../../styles/Navbar/navbar.scss";
import { fetchOrg } from "../../redux/actions/orgAction";
import { userLogout } from "../../redux/rootReducer";
import { fetchPlans } from "../../redux/actions/plansAction";
import { createActivity } from "../dashBoard/ActivityTable";
import { getWallet } from "../../redux/actions/walletAction";
import { fetchSubscription } from "../../redux/actions/subscriptionAction";
import { useGetOrgs } from "../../hooks/orgHooks";
import { useGetUser } from "../../hooks/userHooks";

const Sidebar = ({ auth }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userLoading, userError, isUserLoggedIn, currentUser] = useGetUser()
  const [numberofOrgs,currentOrgID,orgArray,orgloading] = useGetOrgs()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchOrg());
    dispatch(fetchPlans());
    dispatch(getWallet())
  }, []);

  useEffect(()=>{
    if(currentOrgID)
    dispatch(fetchSubscription(currentOrgID))
  },[currentOrgID])

  const getIp = async () => {
    const request = await fetch(
      `https://ipinfo.io/json?token=${process.env.REACT_APP_IP_TOKEN}`
    );
    const jsonResponse = await request.json();
  
    if(JSON.stringify(jsonResponse) !== localStorage.getItem('ipinfo'))
    localStorage.setItem('ipinfo' ,JSON.stringify( jsonResponse));
  };

  useEffect(() => {getIp()}, []);

  useEffect( async()=>{
    const user = auth.getAccount();
    let {data} = await auth.sdk.from("profiles").select("avatar_url").filter('id', 'eq', user.id)

    if(data === null || data[0] == null)
    { console.log("no profile data")}
    else
    localStorage.setItem('avatar_url' , data[0].avatar_url)
  },[])


  const history = useHistory();

  const signOutUser = async () => {

    const { error } = await auth.logout();
    if (error) console.log(error);
    dispatch(userLogout())
     //add log out activity to activity table in localstorage
    createActivity('Logged Out')
    localStorage.removeItem('ipinfo')
   
    history.push("/auth");
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
          <Menu iconShape='square'>
            <MenuItem
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              icon={<img width={20} height={20}  src='favicon-lazarus.png' />}
            >
              Lazarus Network
            </MenuItem>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square" >
          { !sidebarCollapsed && <p className='tag'>&nbsp; home</p>}
            <MenuItem title="Dashboard" icon={<FaColumns />}>
              Dashboard
              <Link to="/dash/" />
            </MenuItem>

            <MenuItem title="Organisations" icon={<FaBuilding />}>
              Organisations
              <Link to="/dash/organisations" />
            </MenuItem>

           { !sidebarCollapsed && <p className='tag'>&nbsp; services</p>}
            {isUserLoggedIn && numberofOrgs ? (
              <>
                <MenuItem title="AVPN" icon={<FaUserLock />}>
                  Anonymous VPN
                  <Link to="/dash/anonymousVPN" />
                </MenuItem>

                <MenuItem title="DVPN" icon={<FaShieldAlt />}>
                  Dedicated VPN
                  <Link to="/dash/dedicatedNetwork" />
                </MenuItem>
                {/* <MenuItem title="Cloud" icon={<FaCloud />}>
                 NextCloud
                  <Link to="/dash/nextCloud" />
                </MenuItem>
                <MenuItem title="Tunnel" icon={<FaDungeon />}>
                  Tunnel
                  <Link to="/dash/tunnel" />
                </MenuItem> */}

              
              </>
            ) : (
              <>
                <MenuItem title="AVPN" className='disabled'  icon={<FaUserLock color='grey' />}>
                  Anonymous VPN
                 
                </MenuItem>

                <MenuItem title="DVPN" className='disabled' icon={<FaShieldAlt color='grey' />}>
                  Dedicated Network
                
                </MenuItem>

                {/* <MenuItem title="Cloud" className='disabled' icon={<FaCloud color='grey' />}>
                  NextCloud
                
                </MenuItem>

                <MenuItem title="Tunnel" className='disabled' icon={<FaDungeon color='grey' />}>
                  Tunnel
              
                </MenuItem> */}

               
              </>
            )}

{ !sidebarCollapsed && <p className='tag'>&nbsp; billing</p>}
            
            <MenuItem title="Billing" icon={<FaFileInvoice />}>
              Billing
              <Link to="/dash/billing" />
            </MenuItem>
            <MenuItem title="Wallet" icon={<FaWallet />}>
              Wallet
              <Link to="/dash/wallet" />
            </MenuItem>

       { !sidebarCollapsed && <p className='tag'>&nbsp; settings</p>}
            <MenuItem title="Profile" icon={<FaUser />}>
              Profile
              <Link to="/dash/profile" />
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
