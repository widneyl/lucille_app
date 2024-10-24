{/*
    TELA PARA ADICIONAR OS VALES E REALIZAR O PAGAMENTO DA QUINZENA
    
    Aqui deixei apenas o front-end pronto. Os campos onde devem ser inseridos o 
    nome do produto, o valor e o preço serão todos temporários, já que vamos criar 
    uma tela para a seleção de produtos. Na parte do perfil, abaixo do nome, há um 
    botão de "Visualizar Perfil". Esse botão levará até a tela do perfil do funcionário, 
    onde poderemos editar os atributos dele e também demiti-lo. Nesta tela, falta implementar 
    a lógica para adicionar os vales ao funcionário. Deixei a ViewAndEdit intacta para que
    possa ser utilizada com a mesma lógica.

    >>Widney Lima 17/10/2024
  
*/}




import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';


import Logo from '../components/logo/Logo';
import ProfileImage from '../img/profileIconEdit.png'
import IconMoney from '../img/money.png'
import AntDesign from '@expo/vector-icons/AntDesign';
import Clock from '../img/clock.png'
import useDatabaseConfig from '../database/useDatabaseConfig';
import ValeCard from '../components/valeCard';

import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function ViewAndEdit({ route }) {

    // guardando o id do funcionario que foi passado pelo parametro
    const funcionarioId = route.params.funcId;

    // state para nome do funcionário
    const [nomeDoFuncionario, setNomeDoFuncionario] = useState();

    // states para controle dos vales
    const [vales, setVales] = useState([])

    // instância para o banco de dados
    const db = useDatabaseConfig();

    // instância para navegar para outras telas
    const navigator = useNavigation()

    let coutProductSelected = vales.length;

    function reloadcoutProductSelected(){
        coutProductSelected = 0
    }
    // logo ao entrar na tela o useEffect vai setar o nome do funcionário
    useEffect(() => {
        db.findById_WithDB(funcionarioId).then((f) => {

            setNomeDoFuncionario(f.nome);
            // validação para campo de vales vazio na tabela do bd
            if (f.vales != null) {
                setVales(JSON.parse(f.vales));
            }
        })
            .catch(err => console.log('deu erro aqui no atualizafunc: ' + err))
    }, [])

    // o useFocusEffect vai fazer acontecer o reload dos vales adicionados depois de adicinados na tela de produtos, ao entrar em foco ele vai buscar os vales do funcionario do bd
    useFocusEffect(
        useCallback(() => {
            console.log('to aqui no componente vale');
            db.findById_WithDB(funcionarioId).then((f) => {

                // validação para campo de vales vazio na tabela do bd
                if (f.vales != null) {
                    setVales(JSON.parse(f.vales));
                }
            })
                .catch(err => console.log('deu erro aqui no atualizafunc: ' + err))
        }, [])
    );

    // agora com a tela de exibição dos produtos, essa função fica inutilizada
    // function adicionarNovoVale() {
    //     const vale = {
    //         descricao: produto,
    //         valor: Number(valor),
    //     }

    //     // console.log(vale)

    //     let arrayVale = vales;
    //     arrayVale.push(vale);
    //     setVales(arrayVale);

    //     // console.log(vales);

    //     let valesStr = JSON.stringify(vales);

    //     db.updateVale(funcionarioId, valesStr);
    // }

    return (
        <View style={styles.container}>

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <ScrollView >

                    <View>
                        <Logo />
                    </View>

                    <View style={styles.boxHeader}>

                        <Image
                            source={ProfileImage}
                            style={{ width: 90, height: 90 }}
                        />
                        <View style={styles.boxHeaderProfileOptions}>

                            {/*Aqui é necessaario que seja exibido o nome do funcionario referente ao card*/}
                            {/* >> 18/10/2024 sofia: já está exibindo */}
                            <Text style={styles.textHeaderNameProfile}>{nomeDoFuncionario}</Text>

                            {/* Botão que leva para a tela de perfil do funcionario.
                                Aqui vai precisar de uma rota, talvez uma stack mesmo ja vai ser o suficiente.  
                            */}
                            <TouchableOpacity style={styles.bottonHeaderProfile}

                                onPress={() => {
                                    // adicionarNovoVale();

                                    // navegando para a tela de listagem de produtos, aqui passo por parametro o id e os vales do funcionário em questão
                                    navigator.navigate('ProfileFunc', {
                                        funcId: funcionarioId,
                                        vale: vales
                                    })
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 14 }}>Vizualizar perfil</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.boxAddVale}>
                        <View style={styles.boxHeaderCategory}>
                            <Text style={{ fontSize: 24, paddingTop: 10, paddingBottom: 10, fontWeight: '500' }}>Adicionar vale</Text>
                            <TouchableOpacity>
                                <Image
                                    source={Clock}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        alignSelf: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10 }}>
                            {/*So lembrando que o vale pode ser em dinheiro OU em produto!*/}
                            <View style={styles.boxInput}>
                                <View>
                                    <View style={styles.form}>
                                        <Text style={styles.textInput}>Dinheiro R$:</Text>
                                        <View style={{ width: '60%' }}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='50'
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Image
                                    style={styles.imageIcon}
                                    source={IconMoney}
                                />
                            </View>
                            <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 20 }} />
                            {/* Essa parte aqui vai ser temporaria, uma vez que vamos ter que criar uma tela de seleção de produto, por enquanto vai ter
                                que escrever o nome dor produto e o preço msm */}
                            <TouchableOpacity style={styles.bottonViewProducts}
                                onPress={() => {
                                    // adicionarNovoVale();
                                    // navegando para a tela de listagem de produtos, aqui passo por parametro o id e os vales do funcionário em questão
                                    navigator.navigate('Produtos', {
                                        funcId: funcionarioId,
                                        vale: vales
                                    })
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>Selecionar produtos  </Text>
                                    <AntDesign name="plus" size={23} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            // caso o campo de vales esteja vazio no funcionário, deve exibir somente uma mensagem, caso contrário exibir os componentes do card
                            (vales.length == 0)
                                ?
                                <Text style={{ paddingLeft: 10, fontSize: 18 }}>Nenhum produto adicionado</Text>
                                :
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{backgroundColor: "#5ea629", marginLeft: 9, borderRadius: 5}}><Text style={{fontSize: 18, paddingLeft: 5, paddingRight: 5, color: 'white'}}>{coutProductSelected}</Text></View>
                                    <Text style={{ fontSize: 18 }}>{(coutProductSelected > 1) ? <Text> Produtos adicinados</Text> : <Text>{coutProductSelected} Produto adicionado</Text>}</Text>
                                </View>

                        }
                        <TouchableOpacity style={styles.bottonAdd}
                            onPress={() => {
                                reloadcoutProductSelected();
                                //adicionarNovoVale();
                                // navegando para a tela de listagem de produtos, aqui passo por parametro o id e os vales do funcionário em questão
                                // navigator.navigate('ViewProducts', {
                                //     funcId: funcionarioId,
                                //     vale: vales
                                // })
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>Adicionar Vale</Text>
                        </TouchableOpacity>
                        {/*
                            Nessa parte aqui do pagamento vamos ter alguns detalhes >>>
                            Vamos exibir o valor da quinzena ja calculado tudo certinho.
                            Porem, vamos deixar esse valor editavel.
                            Valor R$: quinz - vales
                            Ex:
                            Quinzena: 550
                            Total em vales: 100
                        
                            Vai ser exibido:    Valor R$: 450
                        
                        */}
                        <View style={styles.boxHeaderCategory}>
                            <Text style={{ fontSize: 24, paddingTop: 20, paddingBottom: 10, fontWeight: '500' }}>Adicionar Pagamento</Text>
                            <TouchableOpacity>
                                <Image
                                    source={Clock}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        alignSelf: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10 }}>
                            <View style={styles.boxInput}>
                                <View>
                                    <View style={styles.form}>
                                        <Text style={styles.textInput}>Valor R$:</Text>
                                        <View style={{ width: '70%' }}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='quinz - vales'
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Image
                                    style={styles.imageIcon}
                                    source={IconMoney}
                                />
                            </View>
                            <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 20 }} />
                        </View>
                        <View style={{ paddingBottom: 30 }}>
                            <TouchableOpacity style={styles.bottonAdd}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Adicionar Pagamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 23,
        paddingRight: 23,
    },
    boxHeader: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',

    },
    boxHeaderProfileOptions: {
        flexDirection: 'column',
        padding: 10,
        paddingLeft: 15,
        gap: 5,

        width: '100%'
    },
    textHeaderNameProfile: {
        color: '#5ea629',
        fontSize: 21,
        fontWeight: '500'
    },
    bottonHeaderProfile: {
        backgroundColor: '#5ea629',
        borderRadius: 5,
        alignItems: 'center',
        padding: 6,
        width: '36%'
    },
    boxHeaderCategory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    form: {
        flexDirection: 'row',

    },
    input: {
        fontSize: 18,
        borderWidth: 0,
        paddingLeft: 5,


    },
    textInput: {
        fontSize: 18,
        paddingTop: 2,
        color: 'black',
        fontWeight: '500'
    },
    imageIcon: {
        width: 22,
        height: 22,
        marginTop: 2,

    },
    bottonAdd: {
        backgroundColor: '#5ea629',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        width: '60%',
        alignSelf: 'center',
        marginTop: 8,

    },
    bottonViewProducts: {
        backgroundColor: '#011126',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        marginTop: 8,
    }

});
