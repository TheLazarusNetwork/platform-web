import { combineReducers } from 'redux'
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer';

const rootReducers = combineReducers({
    theme: themeReducer,
    user: userReducer
})

export default rootReducers;