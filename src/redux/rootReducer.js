import { combineReducers } from 'redux'
import membersReducer from './reducers/membersReducer';
import orgReducer from './reducers/orgReducer';
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer';

const appReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    organisations: orgReducer,
    memberships : membersReducer,
})

const rootReducer =(state,action) =>{
    if(action.type === 'USER_LOGOUT'){
        return appReducer(undefined,action)
    }
    return appReducer(state,action)
}
export const userLogout = () => ({
    type: 'USER_LOGOUT',
  });

export default rootReducer;