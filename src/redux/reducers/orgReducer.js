import {
    FETCH_ORG_BEGIN,
    FETCH_ORG_FAILURE,
    FETCH_ORG_SUCCESS,
  } from "../CONSTANTS";
  
  const initialState = {
    orgArray: null,
    error: null,
    loading: false,
    numberOfOrgs :0,
  };

  export default function orgReducer(state = initialState, action) {
  
    switch (action.type) {
      case FETCH_ORG_BEGIN:
        return {
             ...state,
           loading: true, 
           numberOfOrgs: 0,
           error: null
           };
      case FETCH_ORG_SUCCESS:
          return{
              ...state,
              loading: false,
              orgArray: action.payload,
              numberOfOrgs : JSON.parse(action.payload).length()
          };
      case FETCH_ORG_FAILURE:
          return{
              ...state,
              loading:false,
              error: action.payload.error,
              orgArray: null,
          };
  
      default:
        return state;
    }
  }