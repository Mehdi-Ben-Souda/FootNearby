import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../ProfileScreeen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from "react-native";
import TerrainsScreen from "../TerrainsScreen";
import PitchScheduleScreen from "../PitchScheduleScreen";
import ReservationList from "../ReservationListPlayer";


const Tab = createBottomTabNavigator(); //creation d’ une instance du Tab.Navigator en utilisant createBottomTabNavigator
const TabNavigator = (props) => {
    return ( /* Définir les écrans dans le Tab.Navigator */
        <View style={{ flex: 1 }}>
            <Tab.Navigator initialRouteName="Profile">

                {<Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" size={size} color={color} style={{ width: '30' }} />),
                    tabBarLabel: 'Profile'
                }} />}
                <Tab.Screen name="Terrains" component={TerrainsScreen} options={{
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="soccer" size={size} color={color} style={{ width: '30' }} />),
                    tabBarLabel: 'Terrains'
                }} />
                {/* <Tab.Screen name="Horaires" component={PitchScheduleScreen} options={{
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="calendar" size={size} color={color} style={{ width: '30' }} />),
                    tabBarLabel: 'Horaires'
                }} /> */}
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
                        tabBarLabel: "Reservations",
                    }} />

            </Tab.Navigator>
        </View>

    )
}
export default TabNavigator;