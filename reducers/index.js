import { ADD_DECK, ADD_CARD } from "../constants";

function cardentries(state = {}, action) {
	switch (action.type) {
		case ADD_DECK:
			return {
				...state,
				...action.deck
			}
		case ADD_CARD:
			return {

			}
		default:
			return state
	}
}

export default cardentries;