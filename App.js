import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, StatusBar } from 'react-native';
import store from "./store";
import { Provider } from "react-redux";
import Decks from "./components/Decks";
import AddDecks from "./components/AddDecks";
import DeckCardsHome from "./components/DeckCardsHome";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from "./utils/colors";
import { createStackNavigator } from "@react-navigation/stack";

const FlashCardStatusBar = ({ backgroundColor, ...props }) => {
	return (
		<View style={{ backgroundColor, height: 100 }}>
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

const TabNav = () => (
	<Tab.Navigator {...TabNavigatorConfig}>
		<Tab.Screen {...RouteConfigs["Decks"]} />
		<Tab.Screen {...RouteConfigs["AddDecks"]} />
	</Tab.Navigator>
);

const StackNavigatorConfig = {
	headerMode: "screen"
};
const StackConfig = {
	TabNav: {
		name: "Home",
		component: TabNav,
		options: { headerShown: false }
	},
	AddCards: {
		name: "DeckCardsHome",
		component: DeckCardsHome,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			},
			title: "Deck Cards Home"
		}
	}
};

const Stack = createStackNavigator();
const MainNav = () => (
	<Stack.Navigator {...StackNavigatorConfig}>
		<Stack.Screen {...StackConfig["TabNav"]} />
		<Stack.Screen {...StackConfig["AddCards"]} />
	</Stack.Navigator>
);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
					<NavigationContainer>
						<MainNav />
					</NavigationContainer>
				</View>
			</Provider>
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
