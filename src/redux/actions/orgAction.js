import { config } from "../../api/config";
import {
  FETCH_ORG_BEGIN,
  FETCH_ORG_SUCCESS,
  FETCH_ORG_FAILURE,
  CHANGE_CURRENT_ORG,
} from "../CONSTANTS";

const baseUrl = config.platformURL;
const orgUrl = baseUrl +"/orgs"

export function fetchOrg() {
  let auth_token;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log(auth_token);

  console.log("inside fetchOrg");

  return (dispatch) => {
    dispatch(fetchOrgBegin());

    return fetch(orgUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchOrgSuccess(json.payload));
        // console.log(json.payload);
        return json.payload;
      })
      .catch((error) => {
        dispatch(fetchOrgFailure(error));
        console.log(error);
      });
  };
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.status);
  return response;
}

export const fetchOrgBegin = () => ({
  type: FETCH_ORG_BEGIN,
});

export const fetchOrgSuccess = (userData) => ({
  type: FETCH_ORG_SUCCESS,
  payload: userData,
});

export const fetchOrgFailure = (error) => ({
  type: FETCH_ORG_FAILURE,
  payload: { error },
});

export const changeCurrentOrg =(id) =>({
  type : CHANGE_CURRENT_ORG,
  payload :id,
});
