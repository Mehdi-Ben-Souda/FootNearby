import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../ProfileScreeen";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import ViewPitchScreen from "../ViewPitchScreen";
import AddPitchScreen from "../AddPitchScreen";
import ReservationList from "../ReservationList";

const Tab = createBottomTabNavigator(); //creation d’ une instance du Tab.Navigator en utilisant createBottomTabNavigator
const TabNavigator = (props) => {
  return (
    /* Définir les écrans dans le Tab.Navigator */
    <View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
                style={{ width: "30" }}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
        <Tab.Screen
          name="Add Pitch"
          component={AddPitchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={size}
                color={color}
                style={{ width: "30" }}
              />
            ),
            tabBarLabel: "Add Pitch",
          }}
        />
        <Tab.Screen
          name="View Pitch"
          component={ViewPitchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={size}
                color={color}
                style={{ width: "30" }}
              />
            ),
            tabBarLabel: "View Pitch",
          }}
        />
        <Tab.Screen
          name="Reservation List"
          component={ReservationList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="book-marker"
                size={size}
                color={color}
                style={{ width: "30" }}
              />
            ),
            tabBarLabel: "Reserations",
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
export default TabNavigator;
