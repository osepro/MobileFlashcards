import React, { Component } from "react";
import { white, gray } from "../utils/colors";
import { connect } from "react-redux";
import pluralize from "pluralize";
import { View, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import { deleteDeck } from "../utils/api";
import { delDeck } from "../actions";

class DeckCardsHome extends Component {
	state = {
		response: false
	}
	setMainHeader = () => {
		const { deck } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: deck
		});
	}
	deckItem = (deck, deckId) => {
		this.props.navigation.navigate('AddCard', { deck: deck, deckId: deckId })
	}

	startQuiz = (deck, deckId) => {
		this.props.navigation.navigate('StartQuiz', { deck: deck, deckId: deckId })
	}

	deleteAction = (deckId) => {
		const { dispatch } = this.props
		dispatch(delDeck(deckId));
		deleteDeck(deckId);
		this.props.navigation.navigate("Decks");
	}

	deleteDeck = (deckId) => {

		Alert.alert(
			"Delect",
			"Are you sure you want to delete?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancelled"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => this.deleteAction(deckId) }
			],
			{ cancelable: false }
		);
	}

	render() {
		this.setMainHeader();
		const { deckId } = this.props.route.params;
		const { state } = this.props;
		const decks = state[deckId];
		if (decks) {
			return (
				<View View style={styles.row}>
					<Text style={styles.titletext}>{decks.name}</Text>
					<Text style={styles.cardtitle}>{`${decks.cards.length} ${pluralize("Card", decks.cards.length)}`}</Text>
					<View style={styles.btnView}>
						<TouchableOpacity style={styles.btnAdd} onPress={() => this.deckItem(decks.name, deckId)}>
							<Text style={styles.btnTextAdd}>Add Card</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btnStart} onPress={() => this.startQuiz(decks.name, deckId)}>
							<Text style={styles.btnTextStart}>Start Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.deleteDeck(deckId)}>
							<Text style={styles.btnTextDel}>Delete Deck</Text>
						</TouchableOpacity>

					</View>
				</View>
			)
		}
		return (
			<View>
				{this.props.navigation.navigate("Decks")}
			</View>
		)

	}
}

function mapStateToProps(state) {
	return {
		state
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white,
	},
	row: {
		flex: 1,
		alignItems: "center",
		paddingBottom: 20,
		marginTop: 100,
	},
	titletext: {
		fontSize: 30,
		fontFamily: 'Trebuchet MS',
	},
	cardtitle: {
		fontSize: 20,
		color: gray,
		textAlign: "center"
	},
	btnView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
	btnAdd: {
		backgroundColor: "#FFFFFF",
		padding: 15,
		paddingLeft: 80,
		paddingRight: 80,
		borderRadius: 5,
		marginBottom: 10
	},
	btnStart: {
		backgroundColor: "#000000",
		padding: 15,
		paddingLeft: 80,
		paddingRight: 80,
		borderRadius: 5,
		marginBottom: 10
	},
	btnTextStart: {
		color: "#FFFFFF",
		fontSize: 18
	},
	btnTextAdd: {
		color: "#000000",
		fontSize: 18
	},
	btnTextDel: {
		color: "#FF0000",
		fontSize: 18
	}
})

export default connect(mapStateToProps)(DeckCardsHome);