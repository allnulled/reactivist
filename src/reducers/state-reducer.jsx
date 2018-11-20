export default function(state = null, action) {
	switch(action.type) {
		case "SET_STATE_ON":
			return action.payload;
		case "SET_STATE_OFF":
			return action.payload;
	}
	return state;
}