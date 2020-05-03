import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import QuizResult from "./QuizResult";
import { white, red } from "../utils/colors";
import PropTypes from 'prop-types';


class QuizQuestion extends Component {

	state = {
		question: '',
		answer: '',
		correct: 0,
		inCorrect: 0,
		count: 0,
		currentQuestion: 0,
		flip: false
	}

	correctAnswer = (response) => {
		const { quiz } = this.props;
		if (this.state.currentQuestion <= quiz[0].length) {
			this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }))
		}

		if (response) {
			this.setState((prevState) => ({
				correct: prevState.correct + 1
			}))
		}

		if (!response) {
			this.setState((prevState) => ({
				inCorrect: prevState.inCorrect + 1
			}))
		}
	}
	flipAnswer = () => {
		this.setState({
			flip: !this.state.flip
		})
	}

	render() {
		const { quiz } = this.props;
		return (
			<View style={styles.questionContainer}>
				{
					this.state.currentQuestion <= quiz[0].length ? (
						Object.values(quiz).map((cardDetails, i) => (
							<View key={i}>
								{!cardDetails[this.state.currentQuestion] ?
									(<QuizResult correct={this.state.correct} deck={this.props.deck} deckId={this.props.deckId} incorrect={this.state.inCorrect} navigation={this.props.navigation} />)
									: (<View>
										<Text style={styles.quizCount}>{this.state.currentQuestion + 1}/{cardDetails.length}</Text>
										{!this.state.flip && (<View>
											<Text style={styles.questionsTxt}>{cardDetails[this.state.currentQuestion].question}</Text>
											<TouchableOpacity onPress={() => this.flipAnswer()}>
												<Text style={styles.textAns}>Answer</Text>
											</TouchableOpacity>
										</View>)}
										{this.state.flip && (<View>
											<Text style={styles.questionsTxt}>{cardDetails[this.state.currentQuestion].answer}?</Text>
											<TouchableOpacity onPress={() => this.flipAnswer()}>
												<Text style={styles.textAns}>Question</Text>
											</TouchableOpacity>
										</View>)}

										<View style={{ justifyContent: "center" }}>
											<TouchableOpacity style={styles.button} onPress={() => this.correctAnswer(true)}>
												<Text style={styles.text}>Correct</Text>
											</TouchableOpacity>
											<TouchableOpacity style={styles.buttonInc} onPress={() => this.correctAnswer(false)}>
												<Text style={styles.text}>InCorrect</Text>
											</TouchableOpacity>
										</View>
									</View>)
								}

							</View>
						)))

						: <QuizResult correct={this.state.correct} deck={this.props.deck} deckId={this.props.deckId} incorrect={this.state.inCorrect} navigation={this.props.navigation} />
				}
			</View>
		);
	}
}

QuizQuestion.propTypes = {
	quiz: PropTypes.array,
};

const styles = StyleSheet.create({
	questionContainer: {
		width: 340
	},
	button: {
		borderRadius: 5,
		backgroundColor: "#008000",
		margin: 10,
		padding: 15,
	},
	buttonInc: {
		borderRadius: 5,
		backgroundColor: red,
		margin: 10,
		padding: 15,
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: white
	},
	questionsTxt: {
		fontSize: 55,
		textAlign: "center",
		color: "#666666",
		fontFamily: 'Trebuchet MS',
		marginBottom: 40,
	},
	textAns: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: red,
		marginBottom: 40
	},
	quizCount: {
		fontSize: 15,
		color: "#000000",
		marginBottom: 15,
	},
});

export default QuizQuestion;