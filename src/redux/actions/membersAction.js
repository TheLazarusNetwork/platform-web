import axios from "axios";
import { config } from "../../api/config";
import {
  FETCH_MEMBERS_BEGIN,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAILURE,
  INVITE_MEMBERS_BEGIN,
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILURE,
} from "../CONSTANTS";
import { fetchOrgFailure } from "./orgAction";
const membershipUrl = config.platformURL + "/memberships/";

export const fetchMembers = (orgId) => async (dispatch) => {
  let auth_token;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside fetch members");
  const membersUrl = membershipUrl + orgId;

  const config = {
    method: "get",
    url: membersUrl,
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  try {
    dispatch(fetchMembersBegin());
    const response = await axios(config);
    dispatch(fetchMembersSuccess(response.data.payload));
  } catch (e) {
    dispatch(fetchOrgFailure(e));
  }
};

export function inviteNewMember(emailId, role, orgId, orgName) {
  let auth_token = null;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside invite member");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${auth_token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: emailId.toString(),
    role: role.toString(),
    org_id: orgId,
    org_name: orgName.toString(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return (dispatch) => {
    dispatch(inviteMemberBegin());

    return fetch(membershipUrl, requestOptions)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(inviteMemberSuccess(json.payload));
        console.log(json.payload);
        return json.payload;
      })
      .catch((error) => {
        dispatch(inviteMemberFailure(error));
        console.log(error);
      });
  };
}

async function handleErrors(response) {
  if (response.status < 200 || response.status > 299) {
    console.log(response.json());
    throw await response.json();
  }
  return response;
}

export const fetchMembersBegin = () => ({
  type: FETCH_MEMBERS_BEGIN,
});

export const fetchMembersSuccess = (membersData) => ({
  type: FETCH_MEMBERS_SUCCESS,
  payload: membersData,
});

export const fetchMembersFailure = (error) => ({
  type: FETCH_MEMBERS_FAILURE,
  payload: { error },
});

export const inviteMemberBegin = () => ({
  type: INVITE_MEMBERS_BEGIN,
});

export const inviteMemberSuccess = (membersData) => ({
  type: INVITE_MEMBERS_SUCCESS,
  payload: membersData,
});

export const inviteMemberFailure = (error) => ({
  type: INVITE_MEMBERS_FAILURE,
  payload: { error },
});
