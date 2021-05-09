import {combineReducers} from 'redux';
import setting from "./setting";
import rehydrated from "./rehydrated";

export default combineReducers(
    {
        setting,
        rehydrated // Important
    }
)
