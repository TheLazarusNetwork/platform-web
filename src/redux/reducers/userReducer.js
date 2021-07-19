import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../CONSTANTS";

const initialState = {
  currentUserData: {},
  error: null,
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
           ...state,
         loading: true, 
         error: null
         };
    case FETCH_USER_SUCCESS:
        return{
            ...state,
            loading: false,
            currentUserData: action.payload
        };
    case FETCH_USER_FAILURE:
        return{
            ...state,
            loading:false,
            error: action.payload.error,
            currentUserData: {}
        };

    default:
      return state;
  }
}
