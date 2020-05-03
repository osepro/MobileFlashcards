import React from "react";
import pluralize from "pluralize";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { gray } from "../utils/colors";

const DeckItem = ({ id, name, deckItem, cards }) => (
	<TouchableOpacity style={styles.decks} onPress={() => deckItem(name, id)}>
		<Text style={styles.titletext}>{name}</Text>
		<Text style={styles.cardtitle}>{`${cards.length} ${pluralize("Card", cards.length)}`} </Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	decks: {
		backgroundColor: "#EEE",
		width: "100%",
		alignItems: "center",
		borderRadius: 5,
		shadowOffset: { width: 2, height: 2, },
		shadowColor: "#666666",
		shadowOpacity: 1.0,
		paddingTop: 10,
		paddingBottom: 10,
	},
	titletext: {
		fontSize: 35,
		fontFamily: 'Trebuchet MS',
		color: "#666"
	},
	cardtitle: {
		fontSize: 20,
		color: gray,
		textAlign: "center",
	}
});

export default DeckItem;