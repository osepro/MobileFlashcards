import { ADD_DECK, ADD_CARD, GET_DECKS, DEL_DECK } from "../constants";

function cardentries(state = {}, action) {
	switch (action.type) {
		case GET_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.id]: {
					id: action.id,
					name: action.deck,
					cards: []
				}
			};
		case DEL_DECK:
			delete state[action.deckId]
			return Object.assign({}, state);
		case ADD_CARD:
			return {
				...state,
				[action.addquest.id]: {
					...state[action.addquest.id],
					cards: [
						...state[action.addquest.id].cards,
						{ question: action.addquest.question, answer: action.addquest.answer }
					]
				}
			};
		default:
			return state
	}
}

export default cardentries;