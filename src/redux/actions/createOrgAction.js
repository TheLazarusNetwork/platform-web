import axios from "axios";
import { config } from "../../api/config";
import { createActivity } from "../../Components/dashBoard/ActivityTable";
import {
  CREATE_ORG_BEGIN,
  CREATE_ORG_SUCCESS,
  CREATE_ORG_FAILURE,
} from "../CONSTANTS";
import { fetchOrg } from "./orgAction";

function calcTime( offset) {
    var d = new Date();
    var utc = d.getTime();
    var nd = new Date(utc + (3600000*offset));
    return  nd;
}

export const createOrg = (OrgName,OrgType, Country, Timezone) =>async(dispatch)=>{
  let auth_token;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside CreateOrg");

  const orgUrl = config.platformURL +"/orgs";
  const ipinfo = JSON.parse(localStorage.getItem('ipinfo')) ?JSON.parse(localStorage.getItem('ipinfo')).loc : '0,0'
  const location = ipinfo.split(',');


  var myHeaders = {
    "Authorization" :  `Bearer ${auth_token}`,
    "Content-Type" : "application/json"
  }


  var raw = JSON.stringify({
    Name: OrgName.toString(),
    type: OrgType.toString(),
    lat: Number( location[0]),
    lon: Number(location[1]),
    country: Country.toString(),
    timezone: Timezone.toString(),
  });

  var reqconfig ={
    method: 'post',
    url: orgUrl,
    headers: myHeaders,
    data: raw,
  }


  try{
    dispatch(createOrgBegin())
    const response = await axios(reqconfig)
    // console.log(response.data.payload)
    dispatch(createOrgSuccess(response.data.payload))
    createActivity('New organisation created')

  }catch(e){
    dispatch(createOrgFailure(e))
  }

}

async function handleErrors(response) {
  console.log(response.status)
  if (response.status < 200 || response.status > 299) {
    // console.log(response.json());
    throw await response.json();
  }
  return response;
}

export const createOrgBegin = () => ({
  type: CREATE_ORG_BEGIN,
});

export const createOrgSuccess = (userData) => ({
  type: CREATE_ORG_SUCCESS,
  payload: userData,
});

export const createOrgFailure = (error) => ({
  type: CREATE_ORG_FAILURE,
  payload: { error },
});
