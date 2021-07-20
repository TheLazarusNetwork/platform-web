import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "../CONSTANTS";

export function fetchUser() {
  let auth_token;
  let isuserloggedin = JSON.parse(
    localStorage.getItem("supabase.auth.token")
  );
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log(auth_token)

  console.log("inside fetchUser");
  const userUrl = "https://platform.lazarus.network/api/v1.0/users";

  return (dispatch) => {
    dispatch(fetchUserBegin());
    return fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
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

export function createUser() {
  let auth_token;
  let isuserloggedin = JSON.parse(
    localStorage.getItem("supabase.auth.token")
  );
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  console.log(auth_token)
  console.log("inside fetchUser");
  const userUrl = "https://platform.lazarus.network/api/v1.0/users";

  var raw = JSON.stringify({
    "city": "Kolkata",
    "country": "India",
    "phone": "8976789024"
  });

  return (dispatch) => {
    dispatch(fetchUserBegin());
    return fetch(userUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
      body: raw,
    })
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

function handleErrors(response) {
  if (!response.ok) throw Error(response.status);
  return response;
}

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: { userData },
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});
