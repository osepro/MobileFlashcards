import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, StatusBar } from 'react-native';
import store from "./store";
import { Provider } from "react-redux";
import Decks from "./components/Decks";
import AddDecks from "./components/AddDecks";
import AddCard from "./components/AddCard";
import DeckCardsHome from "./components/DeckCardsHome";
import StartQuiz from "./components/StartQuiz";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from "./utils/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { setLocalNotification } from "./utils/helpers";

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
	DeckCardsHome: {
		name: "DeckCardsHome",
		component: DeckCardsHome,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			},
			title: "Deck Cards Home"
		}
	},
	AddCard: {
		name: "AddCard",
		component: AddCard,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			},
			title: "Add Card"
		}
	},
	StartQuiz: {
		name: "StartQuiz",
		component: StartQuiz,
		options: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			},
			title: "Start Quiz"
		}
	},
};

const Stack = createStackNavigator();
const MainNav = () => (
	<Stack.Navigator {...StackNavigatorConfig}>
		<Stack.Screen {...StackConfig["TabNav"]} />
		<Stack.Screen {...StackConfig["DeckCardsHome"]} />
		<Stack.Screen {...StackConfig["AddCard"]} />
		<Stack.Screen {...StackConfig["StartQuiz"]} />
	</Stack.Navigator>
);

export default class App extends Component {
	componentDidMount() {
		setLocalNotification();
	}
	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
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
	}
});
