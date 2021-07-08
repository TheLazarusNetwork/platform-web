import { combineReducers } from 'redux'
import themeReducer from './reducers/themeReducer'

const rootReducers = combineReducers({
    theme: themeReducer
})

export default rootReducers;