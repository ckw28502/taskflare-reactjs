import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";
import projectReducer from "./projectReducer";

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    project: projectReducer
});

export default rootReducer;