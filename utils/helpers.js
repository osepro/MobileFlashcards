import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const FLASHCARD_STORAGE_KEY = "Udacity:MobileFlashCards";
const NOTIFICATION_KEY = "MobileFlashCards:notifications";

export const RandomGeneratedNumber = () => {
	return (
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15) + new Date().getMilliseconds()
	);
};

/*export function getDailyReminderValue() {
	return {
		today: "👋 Don't forget to practice your cards!"
	};
}*/

export const createNotification = () => ({
	title: "👋 Don't forget to practice",
	body: "Your flash cards want to see you today.",
	ios: {
		sound: true
	},
	android: {
		sound: true,
		vibrate: true,
		priority: "high",
		sticky: false
	}
});

export const clearLocalNotification = () => {
	AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync()
	);
};

export const setLocalNotification = () => {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync();
						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(12);
						tomorrow.setMinutes(30);

						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: "day"
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
};