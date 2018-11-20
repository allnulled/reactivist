export default function(state = null, action) {
	switch(action.type) {
		case "INCREASE_COUNTER":
			return action.payload;
		case "DECREASE_COUNTER":
			return action.payload;
	}
	return state;
}