import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native"
import { white } from "../utils/colors";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { saveCard } from "../utils/api";

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}

	handleAddCard = (input, name) => {
		this.setState({
			[name]: input
		})
	}

	handleCreateQuestion = (deckId) => {
		const { dispatch } = this.props
		const { question, answer } = this.state;

		if (question.length > 0 && answer.length > 0) {
			dispatch(addCard(deckId, question, answer));
			saveCard(deckId, { question, answer });
			this.props.navigation.goBack();
		}
		else {
			alert("👋 Error!!! Question and Answer are required");
		}

	}
	render() {
		const { question, answer } = this.state;
		const { deckId, deck } = this.props.route.params;
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.fillbelow}>Enter card for {deck}</Text>
					<TextInput style={styles.input} placeholder="Question" value={question} onChangeText={(text) => this.handleAddCard(text, "question")} />
					<TextInput style={styles.input} placeholder="Answer" value={answer} onChangeText={(text) => this.handleAddCard(text, "answer")} />
				</View>

				<View style={styles.btnView}>
					<TouchableOpacity style={styles.btn} onPress={() => this.handleCreateQuestion(deckId)}>
						<Text style={styles.btnText}>Submit</Text>
					</TouchableOpacity>
				</View>

			</KeyboardAvoidingView>
		)
	}
}

function mapStateToProps(state) {
	return {
		entry: state
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		justifyContent: "center",
	},
	titletext: {
		fontSize: 35,
		justifyContent: "center",
		textAlign: "center"
	},
	fillbelow: {
		color: "#FF0000",
		fontSize: 12
	},
	input: {
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: "#757575",
		marginTop: 20,
		justifyContent: "center",
		borderRadius: 5
	},
	btnView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
	btn: {
		backgroundColor: "#000000",
		padding: 15,
		paddingLeft: 80,
		paddingRight: 80,
		borderRadius: 5,
		marginTop: 80,
		marginBottom: 30
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 18
	}
})

export default connect(mapStateToProps)(AddCard);