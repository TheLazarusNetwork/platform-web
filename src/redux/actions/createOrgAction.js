import {
  CREATE_ORG_BEGIN,
  CREATE_ORG_SUCCESS,
  CREATE_ORG_FAILURE,
} from "../CONSTANTS";

function calcTime( offset) {
    var d = new Date();
    var utc = d.getTime();
    var nd = new Date(utc + (3600000*offset));
    return  nd;
}

export function createOrg(OrgName,OrgType, Country, Timezone) {
  let auth_token;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside fetch CreateOrg");

  const orgUrl = "https://platform.lazarus.network/api/v1.0/orgs";

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${auth_token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    Name: OrgName.toString(),
    type: "llc",
    lat: 22.572645,
    lon: 8.363892,
    country: Country.toString(),
    timezone: calcTime(Timezone),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return (dispatch) => {
    dispatch(createOrgBegin());

    return fetch(orgUrl, requestOptions)
    
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.payload);
        dispatch(createOrgSuccess());
        return json.payload;
      })
      .catch((error) => {
        dispatch(createOrgFailure());
        console.log(error);
      });
  };
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status);
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
