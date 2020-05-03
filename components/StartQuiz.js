import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { white, gray, red } from "../utils/colors";
import QuizQuestion from "./QuizQuestion";
import { connect } from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class StartQuiz extends Component {
	setMainHeader = () => {
		const { navigation } = this.props;
		navigation.setOptions({
			title: "Quiz"
		});
	}

	render() {
		this.setMainHeader();
		const { decks } = this.props;
		const { deckId, deck } = this.props.route.params;
		let card = [];
		let cardQuiz = [];
		if (Object.values(decks).length > 0) {
			card = Object.values(decks).filter(deck => deck.id === deckId)
		}
		cardQuiz = Object.values(card).map(card => card.cards);
		return (
			<View style={styles.container}>
				{
					Object.values(cardQuiz).map((item, i) => item.length === 0 ?
						(
							<View style={styles.containerSorry} key={i}>
								<Text style={styles.errortitle}>Sorry, you cannot take quiz because there are no cards in the deck.</Text>
							</View>) :
						(<View key={i}>
							<QuizQuestion quiz={cardQuiz} deck={deck} deckId={deckId} navigation={this.props.navigation} />
						</View>)
					)
				}
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		decks: state
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: white,
		padding: 10,
		width: width,
		height: height,
	},
	containerSorry: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10
	},
	errortitle: {
		fontSize: 25,
		color: "#333",
		textAlign: "center"
	},
});

export default connect(mapStateToProps)(StartQuiz);