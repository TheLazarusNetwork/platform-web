import {
  darkTheme,
  lightTheme,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from "../strings";

const themeObject = lightTheme;

const themeReducer = (state = themeObject, action) => {
  switch (action.type) {
    case SET_LIGHT_THEME:
      return lightTheme;
    case SET_DARK_THEME:
      return darkTheme;
    default:
      return state;
  }
};

export default themeReducer;
