import { ADD_DECK, ADD_CARD } from "../constants";

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function addCard(card) {
	return {
		type: ADD_CARD,
		card
	}
}