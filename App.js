import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, StatusBar } from 'react-native';
import Decks from "./components/Decks";
import AddDecks from "./components/AddDecks";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from "./utils/colors";
import Constants from "expo-constants";

const FlashCardStatusBar = ({ backgroundColor, ...props }) => {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

const RouteConfigs = {
	Decks: {
		name: "Decks",
		component: Decks,
		options: { tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Decks' }
	},
	AddDecks: {
		component: AddDecks,
		name: "Add Deck",
		options: { tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck' }
	}
}

const TabNavigatorConfig = {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === "ios" ? purple : white,
		style: {
			height: 86,
			backgroundColor: Platform.OS === "ios" ? white : purple,
			shadowColor: "rgba(0, 0, 0, 0.24)",
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
};

const Tab = Platform.OS === 'ios'
	? createBottomTabNavigator()
	: createMaterialTopTabNavigator()

export default class App extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
				<NavigationContainer>
					<Tab.Navigator {...TabNavigatorConfig}>
						<Tab.Screen {...RouteConfigs['Decks']} />
						<Tab.Screen {...RouteConfigs['AddDecks']} />
					</Tab.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10
	},
	btn: {
		backgroundColor: "#E53224",
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
	},
	btnText: {
		color: "#FFF"
	}
});
