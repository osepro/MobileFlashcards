import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { white, red, blue } from "../utils/colors";
import PropTypes from 'prop-types';


class QuizResult extends Component {

	viewDeck = () => {
		this.props.navigation.navigate('Decks')
	}

	restartQuiz = (deck, deckId) => {
		this.props.navigation.navigate('DeckCardsHome', { deck: deck, deckId: deckId })
	}

	render() {
		const { correct, incorrect, deck, deckId } = this.props;
		const total = correct + incorrect;
		const correctPercent = (correct / total) * 100;
		const inCorrectPercent = (incorrect / total) * 100

		return (
			<View style={styles.container}>
				<Text style={styles.textHeader}>Result Stats</Text>

				<Text style={styles.text}>Correct</Text>
				<Text style={styles.button}>{correctPercent.toFixed(0)}%</Text>
				<Text style={styles.text}>InCorrect</Text>
				<Text style={styles.buttonInc}>{inCorrectPercent.toFixed(0)}%</Text>
				<View style={styles.row}>
					<TouchableOpacity style={styles.resetBtn} onPress={() => this.restartQuiz(deck, deckId)}>
						<Text style={styles.resetText}>Restart Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.resetBtn} onPress={() => this.viewDeck()}>
						<Text style={styles.resetText}>Back To Deck</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

QuizResult.propTypes = {
	correct: PropTypes.number,
	incorrect: PropTypes.number
};

const styles = StyleSheet.create({
	textHeader: {
		fontSize: 34,
		fontWeight: "bold",
		textAlign: "center",
		color: "#333333",
		fontFamily: 'Trebuchet MS',
		marginBottom: 80,
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: "#333333"
	},
	button: {
		borderRadius: 5,
		backgroundColor: "#008000",
		margin: 10,
		padding: 15,
		width: 300,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: white,
		alignItems: "center",
		marginBottom: 30
	},
	buttonInc: {
		borderRadius: 5,
		backgroundColor: red,
		margin: 10,
		padding: 15,
		width: 300,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: white,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50
	},
	resetText: {
		color: blue,
		textAlign: "center",
	},
	resetBtn: {
		borderRadius: 5,
		margin: 10,
		padding: 15,
		fontSize: 18,
		width: 120,
	}
});

export default QuizResult;