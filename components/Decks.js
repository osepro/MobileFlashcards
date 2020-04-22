import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { purple, white } from "../utils/colors";

class Decks extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Text style={styles.titletext}>Decks View</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	titletext: {
		fontSize: 45,
	}
})

export default Decks;