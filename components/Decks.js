import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { white, gray } from "../utils/colors";
import { connect } from "react-redux";
import { CommonActions } from '@react-navigation/native';


class Decks extends Component {

	deckItem = (deck) => {
		this.props.navigation.navigate('DeckCardsHome', { deck: deck })
	}

	handleOnPress = () => {
		alert('Clicke me')
	}

	render() {
		const { decks } = this.props;
		return (
			<ScrollView style={styles.container}>
				{decks.map((deck, i) => (
					<View style={styles.row} key={i}>
						<TouchableOpacity onPress={() => this.deckItem(deck)}>
							<Text style={styles.titletext}>{deck}</Text>
							<Text style={styles.cardtitle}>{0} cards</Text>
						</TouchableOpacity>

					</View>
				))
				}
			</ScrollView>
		)
	}
}

function mapStateToProps(state) {
	const decks = Object.keys(state)
	return {
		decks
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white,
	},
	row: {
		flex: 1,
		alignItems: "center",
		paddingBottom: 20
	},
	titletext: {
		fontSize: 45,
	},
	cardtitle: {
		fontSize: 20,
		color: gray,
		textAlign: "center"
	}
})

export default connect(mapStateToProps)(Decks);