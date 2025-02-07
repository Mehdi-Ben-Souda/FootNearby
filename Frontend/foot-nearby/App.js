import React, { lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/stores/store';
import LazyLoader from './screens/LazyLoader';

// Lazy load screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const SignupScreen = lazy(() => import('./screens/SignupScreen'));
const WelcomeScreenPlayer = lazy(() => import('./screens/Joueur/WelcomeScreenPlayer'));
const WelcomeScreenManager = lazy(() => import('./screens/responsable/WelcomeScreenManager'));
const AddPitchScreen = lazy(() => import('./screens/responsable/AddPitchScreen'));
const ViewPitchScreen = lazy(() => import('./screens/responsable/ViewPitchScreen'));
const EditPitchScreen = lazy(() => import('./screens/responsable/EditPitchScreen'));
const ReservationListScreen = lazy(() => import("./screens/responsable/ReservationList"));
const GererCreneauxScreen = lazy(() => import('./screens/responsable/GererCreneauxScreen'));
const CreerCreneaux = lazy(() => import('./screens/responsable/CreerCreneaux'));

const PitchScheduleScreen = lazy(() => import('./screens/Joueur/PitchScheduleScreen'));
const PitchScreen = lazy(() => import('./screens/PitchScreen'));
const SplashScreen = lazy(() => import('./screens/SplashScreen'));
const PitchReservations = lazy(() => import('./screens/responsable/PitchReservations'));
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Suspense fallback={<LazyLoader />}>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="Home"
              children={props => <HomeScreen {...props} />}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              children={props => <LoginScreen {...props} />}
              options={{ title: 'Connexion' }}
            />
            <Stack.Screen
              name="Signup"
              children={props => <SignupScreen {...props} />}
              options={{ title: 'Inscription' }}
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
              options={{ title: 'Ajouter terrain' }}
            />
            <Stack.Screen
              name="ViewPitch"
              children={props => <ViewPitchScreen {...props} />}
              options={{ title: 'Voir mon terrain' }}
            />
            <Stack.Screen
              name="EditPitch"
              children={props => <EditPitchScreen {...props} />}
              options={{ title: 'Editer terrain' }}
            />
            <Stack.Screen
              name="ReservationList"
              children={(props) => <ReservationListScreen {...props} />}
              options={{ title: "Liste de réservations" }}
            />
            <Stack.Screen
              name="GererCreneaux"
              children={(props) => <GererCreneauxScreen {...props} />}
              options={{ title: "Managment des créneaux" }}
            />
            <Stack.Screen
              name="CreerCreneaux"
              children={(props) => <CreerCreneaux {...props} />}
              options={{ title: "Ajout de créneaux" }}
            />
            <Stack.Screen
              name="PitchScreen"
              children={props => <PitchScreen {...props} />}
              options={{ title: 'Pitch' }}
            />
            <Stack.Screen
              name='PitchScheduleScreen'
              children={(props) => <PitchScheduleScreen {...props} />}
              options={{ title: 'Programmation temporelle' }}
            />
            <Stack.Screen
              name='PitchReservations'
              children={(props) => <PitchReservations {...props} />}
              options={{ title: 'Reservations du terrain' }}
            />
            <Stack.Screen
              name="SplashScreen"
              children={(props) => <SplashScreen {...props} />}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
