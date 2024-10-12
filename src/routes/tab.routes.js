import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importação dos icones
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 

import Home from '../screens/Home'
import RegisterFunc from '../screens/RegisterFunc'
import Debug from "../screens/debugArea";

const Tab = createBottomTabNavigator();




export default function TabRoutes() {


    const tabBarStyleOn = { // Para o estilo do tab
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

    // const [tabBarStyle, setTabBarStyle] = useState(tabBarStyleOn);

    return (
        <Tab.Navigator screenOptions={tabBarStyleOn} >

            <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({size}) => <Octicons name="home" color={'#45791E'} size={size}/>,
                        tabBarLabel: '', // Deixando a label vazia para que apenas o icone seja mostrado
                    }} 
                />

            <Tab.Screen
                name="RegisterFunc"
                component={RegisterFunc}
                options={{
                    tabBarIcon: ( {size} ) => <FontAwesome6 name="arrow-trend-up" color={'#45791E'} size={size}/>,
                    tabBarLabel: '',
                }}
            />

            {/* tela temporaria para testes */}
            <Tab.Screen
                name="DebugArea"
                component={Debug}
                options={{
                    tabBarIcon: ( {size} ) => <FontAwesome6 name="vial" color={'red'} size={size}/>,
                    tabBarLabel: '',
                }}
            />

            {/* criei essa rota pra visualizar a criação dos componentes, ela é uma cópia da home */}
            {/* <Tab.Screen
                name="Template"
                component={TemplateHome}
                options={{
                    tabBarIcon: ( {size, color} ) => <FontAwesome6 name="arrow-trend-up" color={'black'} size={size}/>,
                    tabBarLabel: ''
                }}
            /> */}
            {/*ATUALIZAÇÃO: Os cards foram implementados na tela de home*/}
        </Tab.Navigator>
    )
}