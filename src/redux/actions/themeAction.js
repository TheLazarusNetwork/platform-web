import { lightTheme,darkTheme,SET_DARK_THEME,SET_LIGHT_THEME} from "../strings";

export const changeToLightTheme =()=>{
    return{
        type: SET_LIGHT_THEME,
        
    }
}

export const changeToDarkTheme =()=>{
    return{
        type: SET_DARK_THEME
    }
}