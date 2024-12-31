import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreenPlayer from "./screens/Joueur/WelcomeScreenPlayer";
import WelcomeScreenManager from "./screens/responsable/WelcomeScreenManager";
import { Provider } from "react-redux";
import store from "./redux/stores/store";



const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
          <Stack.Screen name="WelcomeScreenPlayer" component={WelcomeScreenPlayer}
            options={{ headerShown: false }} />
          <Stack.Screen name="WelcomeScreenManager" component={WelcomeScreenManager}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
