import { FETCH_USER_BEGIN,FETCH_USER_SUCCESS , FETCH_USER_FAILURE } from "../CONSTANTS";

export function fetchUser(){

    return dispatch=>{
        dispatch(fetchUserBegin());
        return fetch("http://143.198.170.62:9080/api/v1/user",{
            method: 'POST',
            headers:{
                
            }
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json =>{
                dispatch(fetchUserSuccess(json.payload));
                return json.payload;
            })
            .catch(error => dispatch(fetchUserFailure(error)))
    };
}

function handleErrors(response){
    if(!response.ok)
      throw Error(response.statusText)
    return response;
}

export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
  });
  
  export const fetchUserSuccess = userdata => ({
    type: FETCH_USER_SUCCESS,
    payload: { userdata}
  });
  
  export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: { error }
  });