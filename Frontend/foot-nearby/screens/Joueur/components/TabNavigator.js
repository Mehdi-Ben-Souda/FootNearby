import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../ProfileScreeen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from "react-native";
import TerrainsScreen from "../TerrainsScreen";

const Tab = createBottomTabNavigator(); //creation d’ une instance du Tab.Navigator en utilisant createBottomTabNavigator
const TabNavigator = (props) => {
    return ( /* Définir les écrans dans le Tab.Navigator */
        <View style={{ flex: 1 }}>
            <Tab.Navigator initialRouteName="Profile">

                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" size={size} color={color} style={{ width: '30' }} />),
                    tabBarLabel: 'Profile'
                }} />
                <Tab.Screen name="Terrains" component={TerrainsScreen} options={{
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="soccer" size={size} color={color} style={{ width: '30' }} />),
                    tabBarLabel: 'Terrains'
                }} />

            </Tab.Navigator>
        </View>

    )
}
export default TabNavigator;