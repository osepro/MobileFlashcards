import { ADD_DECK, ADD_CARD, GET_DECKS, DEL_DECK } from "../constants";
import { retrieveDecks } from "../utils/api";

export function getDecks() {
	return (dispatch) => {
		return retrieveDecks()
			.then((decks) => {
				dispatch(
					{
						type: GET_DECKS,
						decks
					}
				)
			})
	}
};

export function addDeck(id, deck) {
	return (dispatch) => {
		dispatch(
			{
				type: ADD_DECK,
				id,
				deck
			}
		)
	}
}

export function delDeck(deckId) {
	return (dispatch) => {
		dispatch({
			type: DEL_DECK,
			deckId
		})
	}
}

export function addCard(id, question, answer) {
	return (dispatch) => {
		dispatch(
			{
				type: ADD_CARD,
				addquest: {
					id,
					question,
					answer
				}
			})

	}
}