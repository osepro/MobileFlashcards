import React, { Component } from "react";
import { white, gray } from "../utils/colors";
import { View, Platform, Text, StyleSheet, TouchableOpacity } from "react-native";

class DeckCardsHome extends Component {
	setMainHeader = () => {
		const { deck } = this.props.route.params;
		const { navigation } = this.props;
		navigation.setOptions({
			title: deck
		});

	}
	render() {
		this.setMainHeader();
		const { deck } = this.props.route.params;
		return (
			<View View style={styles.row}>
				<Text style={styles.titletext}>{deck}</Text>
				<Text style={styles.cardtitle}>{0} cards</Text>
				<View style={styles.btnView}>
					<TouchableOpacity style={styles.btnAdd} onPress={this.handleDeckCreate}>
						<Text style={styles.btnTextAdd}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnStart} onPress={this.handleDeckCreate}>
						<Text style={styles.btnTextStart}>Start Quiz</Text>
					</TouchableOpacity>
					<Text style={styles.btnTextDel}>Delete Deck</Text>
				</View>
			</View>
		)
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
		paddingBottom: 20,
		marginTop: 100,
	},
	titletext: {
		fontSize: 30,
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

export default DeckCardsHome;