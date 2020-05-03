import React, { Component } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native"
import { white } from "../utils/colors";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { saveDeck } from "../utils/api";
import { RandomGeneratedNumber } from "../utils/helpers";

class AddDecks extends Component {
	state = {
		deckTitle: '',
		input: ''
	}

	handleNewDeckObject = () => ({
		id: RandomGeneratedNumber(),
		name: this.state.input,
		cards: []
	})

	handleDeckTitle = (input) => {
		this.setState({
			input
		})
	}
	handleDeckCreate = () => {
		const { dispatch } = this.props;
		let deck = this.handleNewDeckObject();

		dispatch(addDeck(deck.id, deck.name))
		saveDeck(deck);

		this.props.navigation.navigate("DeckCardsHome", {
			deckId: deck.id,
			deck: deck.name
		});

		this.setState(() => ({
			input: ""
		}));
	}
	render() {
		const { input } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.titletext}>What is the title of your new deck?</Text>
					<TextInput style={styles.input} placeholder="Deck Title" value={input} onChange={(evt) => this.handleDeckTitle(evt.nativeEvent.text)} />
				</View>

				<View style={styles.btnView}>
					<TouchableOpacity style={styles.btn} onPress={this.handleDeckCreate}>
						<Text style={styles.btnText}>Create Deck</Text>
					</TouchableOpacity>
				</View>

			</KeyboardAvoidingView>
		)
	}
}

function mapStateToProps(state) {
	return {

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
	input: {
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: "#757575",
		marginTop: 50,
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
		marginTop: 110,
		marginBottom: 10
	},
	btnText: {
		color: "#FFFFFF",
		fontSize: 18
	}
})

export default connect(mapStateToProps)(AddDecks);