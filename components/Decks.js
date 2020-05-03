import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from "react-native"
import { white, gray } from "../utils/colors";
import { connect } from "react-redux";
import pluralize from "pluralize";
import { getDecks } from "../actions";
import { FontAwesome, Ionicons } from "@expo/vector-icons";


class Decks extends Component {
	state = {
		loading: "Retrieving Deck",
		decks: {}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getDecks());
	}

	clearAsyncStorage = async () => {
		AsyncStorage.clear();
	}

	deckItem = (deck, deckId) => {
		this.props.navigation.navigate('DeckCardsHome', { deck: deck, deckId: deckId })
	}

	render() {
		const { decks } = this.props;
		if (decks === null) {
			return (
				<View style={styles.row}>
					<TouchableOpacity>
						<Text style={styles.cardtitle}>Deck currently empty</Text>
					</TouchableOpacity>
				</View>
			)
		}

		return (
			<ScrollView style={styles.container}>
				{Object.values(decks).length > 5 ?
					(<TouchableOpacity onPress={this.clearAsyncStorage} style={styles.remove}>
						<Text style={styles.removeText}>Delete All <FontAwesome name='remove' size={20} color={"red"} /></Text>
					</TouchableOpacity>) : <Text></Text>}
				{Object.values(decks).length > 0 ? (
					Object.values(decks).map((deck, i) => (
						<View style={styles.row} key={i}>
							<TouchableOpacity style={styles.decks} onPress={() => this.deckItem(deck.name, deck.id)}>
								<Text style={styles.titletext}>{deck.name}</Text>
								<Text style={styles.cardtitle}>{`${deck.cards.length} ${pluralize("Card", deck.cards.length)}`} </Text>
							</TouchableOpacity>
						</View>
					))
				) : (
						<View><Text style={styles.cardtitle}>Deck currently empty</Text></View>)
				}
			</ScrollView>
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
		padding: 20,
		backgroundColor: white,
	},
	row: {
		flex: 1,
		alignItems: "center",
		paddingBottom: 20
	},
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
	remove: {
		marginBottom: 30,
		borderRadius: 5,
		backgroundColor: "#333",
		padding: 10,
		width: 120,
	},
	removeText: {
		color: white,
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "center"
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
})

export default connect(mapStateToProps)(Decks);