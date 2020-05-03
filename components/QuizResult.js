import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { white, red } from "../utils/colors";
import PropTypes from 'prop-types';


class QuizResult extends Component {

	render() {
		const { correct, incorrect } = this.props;
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
});

export default QuizResult;