import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importação dos icones
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import TemplateHome from '../screens/TemplateHome'

const Tab = createBottomTabNavigator();

const tabBarStyle = { // Para o estilo do tab
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
    }
}


export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={tabBarStyle}>
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon: ({size}) => <Octicons name="home" color={'#45791E'} size={size}/>,
                    tabBarLabel: '', // Deixando a label vazia para que apenas o icone seja mostrado
                }} 
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ( {size} ) => <FontAwesome6 name="arrow-trend-up" color={'#45791E'} size={size}/>,
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