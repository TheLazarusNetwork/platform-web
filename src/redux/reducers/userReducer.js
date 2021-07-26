import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../CONSTANTS";

const initialState = {
  currentUserData: null,
  error: null,
  loading: false,
  isUserLoggedIn : false,
};

export default function userReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
           ...state,
         loading: true, 
         isUserLoggedIn: false,
         error: null
         };
    case FETCH_USER_SUCCESS:
        return{
            ...state,
            loading: false,
            isUserLoggedIn: true,
            currentUserData: action.payload
        };
    case FETCH_USER_FAILURE:
        return{
            ...state,
            loading:false,
            isUserLoggedIn: false,
            error: action.payload.error,
            currentUserData: null
        };

    default:
      return state;
  }
}
