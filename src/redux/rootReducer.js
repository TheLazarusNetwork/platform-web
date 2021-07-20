import { combineReducers } from 'redux'
import orgReducer from './reducers/orgReducer';
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer';

const rootReducers = combineReducers({
    theme: themeReducer,
    user: userReducer,
    organisations: orgReducer,
})

export default rootReducers;