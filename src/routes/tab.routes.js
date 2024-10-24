import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

//Importação dos icones
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// importação das telas
import Home from '../screens/Home'
import Register from '../screens/RegisterNew'
import Debug from "../screens/debugArea";
import vale from "../screens/Vale";
import ViewProducts from "../screens/ViewProducts";

import ProfileFunc from "../screens/ProfileFunc";

// importação dos tipos de navegações
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




function TabRoutes() {


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
                    tabBarIcon: ({ size }) => <Octicons name="home" color={'#45791E'} size={size} />,
                    tabBarLabel: '', // Deixando a label vazia para que apenas o icone seja mostrado
                }}
            />

            <Tab.Screen
                name="RegisterFunc"
                component={Register}
                options={{
                    tabBarIcon: ({ size }) => <FontAwesome6 name="arrow-trend-up" color={'#45791E'} size={size} />,
                    tabBarLabel: '',
                }}
            />

            {/* tela temporaria para testes */}
            <Tab.Screen
                name="DebugArea"
                component={Debug}
                options={{
                    tabBarIcon: ({ size }) => <FontAwesome6 name="vial" color={'red'} size={size} />,
                    tabBarLabel: '',
                }}
            />

            

            {/*Fiz essa rota apenas para exibir a tela de perfil do funcionario, quando estiver emplementada por favor apagar essa rota*/}
            {/* >> sofia: rota não é mais necessária no tab, por isso comentei */}
            {/* <Tab.Screen
                name="ProfileFunc"
                component={ProfileFunc}
                options={{
                    tabBarIcon: ({ size }) => <MaterialIcons name="edit-document" size={24} color="#45791E" />,
                    tabBarLabel: '',
                }}
            /> */}

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

export default function AllRoutes() {
    return (
        <Stack.Navigator>
            {/* O tab navigator está dentro do stack navigator, assim as navegações em pilha estarão habilitadas */}
            <Stack.Screen
                name="Tabs"
                component={TabRoutes}
                options={{ headerShown: false }}
            />

            {/* primeira rota em pilha, tela temporária para visualizar as informações do funcionário */}
            {/* ATUALIZAÇÃO: A tela oficial "Vale" esta sendo chamada agora*/}
            <Stack.Screen
                name="Vale"
                component={vale}
            />

            {/* tela temporaria para ver produtos e testar lógicas */}
            <Stack.Screen
                name="Produtos"
                component={ViewProducts}
            />

            <Stack.Screen
                name="ProfileFunc"
                component={ProfileFunc}
            />
        </Stack.Navigator>
    );
}