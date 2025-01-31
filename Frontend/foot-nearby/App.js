import React, { lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/stores/store';
import LazyLoader from './screens/LazyLoader';
import GererCreneauxScreen from './screens/responsable/GererCreneauxScreen';
import CreerCreneaux from './screens/responsable/CreerCreneaux';

// Lazy load screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const SignupScreen = lazy(() => import('./screens/SignupScreen'));
const WelcomeScreenPlayer = lazy(() => import('./screens/Joueur/WelcomeScreenPlayer'));
const WelcomeScreenManager = lazy(() => import('./screens/responsable/WelcomeScreenManager'));
const AddPitchScreen = lazy(() => import('./screens/responsable/AddPitchScreen'));
const ViewPitchScreen = lazy(() => import('./screens/responsable/ViewPitchScreen'));
const EditPitchScreen = lazy(() => import('./screens/responsable/EditPitchScreen'));
const ReservationListScreen = lazy(() =>
  import("./screens/responsable/ReservationList")
);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Suspense fallback={<LazyLoader />}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              children={props => <HomeScreen {...props} />}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              children={props => <LoginScreen {...props} />}
              options={{ title: 'Log in' }}
            />
            <Stack.Screen
              name="Signup"
              children={props => <SignupScreen {...props} />}
              options={{ title: 'Sign up' }}
            />
            <Stack.Screen
              name="WelcomeScreenPlayer"
              children={props => <WelcomeScreenPlayer {...props} />}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WelcomeScreenManager"
              children={props => <WelcomeScreenManager {...props} />}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddPitch"
              children={props => <AddPitchScreen {...props} />}
              options={{ title: 'Add a Pitch' }}
            />
            <Stack.Screen
              name="ViewPitch"
              children={props => <ViewPitchScreen {...props} />}
              options={{ title: 'View Pitches' }}
            />
            <Stack.Screen
              name="EditPitch"
              children={props => <EditPitchScreen {...props} />}
              options={{ title: 'Edit Pitches' }}
            />
            <Stack.Screen
              name="ReservationList"
              children={(props) => <ReservationListScreen {...props} />}
              options={{ title: "Reservation List" }}
            />
            <Stack.Screen name="GererCreneaux"
              children={(props) => <GererCreneauxScreen {...props} />}
              options={{ title: "Manage Time Slots" }}
            />
            <Stack.Screen name="CreerCreneaux"
              children={(props) => <CreerCreneaux {...props} />}
              options={{ title: "Create Time Slots" }}
            />
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
