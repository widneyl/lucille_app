import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import TemplateHome from '../screens/TemplateHome'

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon: ({size, color}) => <Octicons name="home" color={'green'} size={size}/>,
                    tabBarLabel: ''
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ( {size, color} ) => <FontAwesome6 name="arrow-trend-up" color={'green'} size={size}/>,
                    tabBarLabel: ''
                }}
            />

            {/* criei essa rota pra visualizar a criação dos componentes, ela é uma cópia da home */}
            <Tab.Screen
                name="Template"
                component={TemplateHome}
                options={{
                    tabBarIcon: ( {size, color} ) => <FontAwesome6 name="arrow-trend-up" color={'black'} size={size}/>,
                    tabBarLabel: ''
                }}
            />
        </Tab.Navigator>
    )
}