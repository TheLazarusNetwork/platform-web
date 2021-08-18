import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "../CONSTANTS";
import axios from "axios";
import { config } from "../../api/config";

const baseUrl = config.platformURL;
const userUrl = baseUrl +'/users'

export const fetchUser = () => async (dispatch) => {
  //fetching supabase jwt token to fetch user details
  let auth_token = null;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside fetchUser");
  const config = {
    url : userUrl,
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  try {
    dispatch(fetchUserBegin());
    const response = await axios(config);
    dispatch(fetchUserSuccess(response.data.payload));
  } catch (e) {
    dispatch(fetchUserFailure(e));
  }
};

export function createUser(cityName, countryName, contactNumber) {
  let auth_token = null;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log("inside Create User");


  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${auth_token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    city: cityName.toString(),
    country: countryName.toString(),
    phone: contactNumber.toString(),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return (dispatch) => {
    dispatch(fetchUserBegin());

    return fetch(userUrl, requestOptions)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUserSuccess(json.payload));
        console.log(json.payload);
        return json.payload;
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
        console.log(error);
      });
  };
}

async function handleErrors(response) {
  if (response.status < 200 || response.status > 299) {
    throw await response.json();
  }
  return response;
}

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});
