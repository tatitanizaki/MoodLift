// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerTitle: "MoodLift", // Custom title for the Welcome screen
          headerTitleAlign: "center", // Center the title
          headerShown: false, // Hide the default header bar
        }}
      />
      <Stack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          headerTitle: "MoodLift",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "MoodLift",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
