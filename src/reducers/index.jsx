import { combineReducers } from "redux";
import stateReducer from "./state-reducer.jsx";
import counterReducer from "./counter-reducer.jsx";

export default combineReducers({
	state: stateReducer,
	counter: counterReducer
});
