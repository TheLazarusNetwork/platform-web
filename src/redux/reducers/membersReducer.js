import {
    FETCH_MEMBERS_BEGIN,
    FETCH_MEMBERS_FAILURE,
    FETCH_MEMBERS_SUCCESS,
    INVITE_MEMBERS_BEGIN,
    INVITE_MEMBERS_FAILURE,
    INVITE_MEMBERS_SUCCESS,
} from '../CONSTANTS'

const initialState ={
    membershipArray :[],
    numberOfMembers :0,
    error: null,
    loading: false,
}

export default function membersReducer(state = initialState, action){
    switch (action.type){
        case FETCH_MEMBERS_BEGIN:
            return{
                ...state,
                loading: true,
            };
            break;
        case FETCH_MEMBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                membershipArray : [...action.payload],
                numberOfMembers: [...action.payload].length,
                error: null,
            }
        case FETCH_MEMBERS_FAILURE:
            return {
                ...state,
                loading: false,
                membershipArray : [],
                numberOfMembers: 0,
                error: action.payload.error,
            };
            break;
        case INVITE_MEMBERS_BEGIN: 
            return{
                ...state,
                loading: true,

            }
        case INVITE_MEMBERS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                membershipArray : [...state.membershipArray, action.payload],
                numberOfMembers: state.numberOfMembers +1,

            }
            break;
        case INVITE_MEMBERS_FAILURE:
            return {
                ...state,
                loading : false,
                error: action.payload.error
            }
        default:
            return state;
    }
}