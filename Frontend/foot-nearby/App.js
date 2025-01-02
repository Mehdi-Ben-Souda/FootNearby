import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreenPlayer from "./screens/Joueur/WelcomeScreenPlayer";
import WelcomeScreenManager from "./screens/responsable/WelcomeScreenManager";
import AddPitchScreen from "./screens/responsable/AddPitchScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddPitch">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Log in" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Sign up" }}
        />
        <Stack.Screen
          name="WelcomeScreenPlayer"
          component={WelcomeScreenPlayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreenManager"
          component={WelcomeScreenManager}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPitch"
          component={AddPitchScreen}
          options={{ title: "Add a Pitch" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
