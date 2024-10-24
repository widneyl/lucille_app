{/*
     
    AQUI SERA A TELA DE PERFIL DO FUNCIONARIO    

*/}

{/*
    Aqui esta a tela de perfil do funcionario, com seus dados.
    Fiz uma rota nova apenas para exibir essa tela por enquanto,
    uma vez que ela so sera exibida quando o usuario clicar em "vizualizar
    perfil" na tela de Vale.

    Comentei todos os onChange e OnPress
    Presisamos que as informaçoes do funcionario seja exibidas aqui (No placeholder)
    Se o usuario quiser editar o funcionario deve clicar em "Editar Perfil"
    Se o usuario quiser apagar o funcionario deve clicar em "Demitir"

    Lembrando que os dados pessoais devem ser exibidos, por enquanto os placeholder estão vazios
    
    
    */}


import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import Logo from '../components/logo/Logo';
import ProfileImage from '../img/profileIconEdit.png'
import iconProfile from '../img/user.png'
import iconCpf from '../img/cpfIcon.png'
import telIncon from '../img/telIcon.png'
import gearIcon from '../img/gearIcon.png'
import calendar from '../img/calendar.png'
import { useEffect, useState } from 'react';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { useNavigation } from '@react-navigation/native';



export default function ProfileFunc( { route } ) {
    
    // parametros passados no navigate
    const funcionarioId = route.params.funcId;

    // para navegações
    const navigator = useNavigation();

    // instância para o banco de dados
    const db = useDatabaseConfig();

    // states para edição no funcionário
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState(0)
    const [telefone, setTelefone] = useState(0)
    const [dataDeAdmissao, setDataDeAdmissao] = useState('')
    const [cargo, setCargo] = useState('')
    const [salario, setSalario] = useState(0)

    // useEffect para recuperar os dados do funcionário assim que o componente for renderizado
    useEffect(() => {
        db.findById_WithDB(funcionarioId).then((f) => {
            // setando os states
            setNome(f.nome);
            setCpf(f.cpf);
            setTelefone(f.telefone);
            setDataDeAdmissao(f.dataDeAdmissao);
            setCargo(f.cargo);
            setSalario((f.salario).toString());

        })
        .catch((err) => {
            console.log('ocorreu um erro ao tentar recuperar as informações para edição do funcionário: ' + err);
        })

    }, [])

    // componente de alert para confirmação de demissão
    const createTwoButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'OK', onPress: () => console.log('OK Pressed')
        },
    ]);

    return (
        <View style={styles.container}>

            <View style={styles.boxHeader}>
                <Logo />
            </View>
            <TouchableOpacity style={styles.profile}>
                <Image
                    source={ProfileImage}
                    style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>

            <View style={styles.nameBox}>
                {/* setando o nome do funcionário */}
                <Text style={styles.textNameProfile}>{ nome }</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <ScrollView style={styles.scrollForm}>
                    
                    <View style={styles.boxInput}>
                        <View style={styles.form}>
                            <Text style={styles.text}>Nome:</Text>
                            <View style={{ width: '75%' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Sem nome cadastrado'
                                    value={nome}
                                    onChangeText={setNome}
                                />
                            </View>
                        </View>

                        <Image
                            source={iconProfile}
                            style={styles.imageIcon}
                        />
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />

                    <View style={styles.boxInput}>
                        <View style={styles.form}>
                            <Text style={styles.text}>CPF:</Text>
                            <View style={{ width: '80%' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Sem CPF cadastrado'
                                    keyboardType='numeric'
                                    value={cpf}
                                    onChangeText={setCpf}
                                />
                            </View>
                        </View>
                        <Image
                            source={iconCpf}
                            style={styles.imageIcon}
                        />
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />

                    <View style={styles.boxInput}>
                        <View style={styles.form}>
                            <Text style={styles.text}>Telefone:</Text>
                            <View style={{ width: '70%' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Sem telefone cadastrado'
                                    keyboardType='numeric'
                                    value={telefone}
                                    onChangeText={setTelefone}
                                />
                            </View>
                        </View>
                        <Image
                            source={telIncon}
                            style={styles.imageIcon}
                        />
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />


                    <View style={styles.boxInput}>
                        <View>
                            <View style={styles.form}>
                                <Text style={styles.text}>Data de admissão:</Text>
                                <View style={{ width: '45%' }}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Sem data de admissão cadastrada'
                                        keyboardType='numeric'
                                        value={dataDeAdmissao}
                                        onChangeText={setDataDeAdmissao}
                                    />
                                </View>
                            </View>
                        </View>
                        <Image
                            source={calendar}
                            style={styles.imageIcon}
                        />
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />

                    <View style={styles.boxInput}>
                        <View>
                            <View style={styles.form}>
                                <Text style={styles.text}>Cargo:</Text>
                                <View style={{ width: '75%' }}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Sem cargo cadastrado'
                                        value={cargo}
                                        onChangeText={setCargo}
                                    />
                                </View>
                            </View>
                        </View>
                        <Image
                            source={gearIcon}
                            style={styles.imageIcon}
                        />
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />

                    <View style={styles.quinzena}>
                        <View style={styles.form}>
                            <Text style={styles.text}>Salario R$:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                value={salario}
                                onChangeText={setSalario}
                            />
                        </View>
                        <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />
                        <View>
                            <View style={styles.form}>
                                <Text style={styles.text}>Quinzena:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Quinzena ainda não calculada'
                                    keyboardType='numeric'
                                    // ainda vou implementar uma forma de exibir a quinzena
                                    value=''
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: '#a6a6a6', borderBottomWidth: 1, marginBottom: 15 }} />

                    <View style={styles.boxBotao}>
                        <TouchableOpacity style={styles.botaoEditar}
                            onPress={() => {
                                db.updateAllFields(funcionarioId, nome, cargo, Number(salario), cpf, telefone, dataDeAdmissao);
                            }}
                        >
                            <Text style={styles.textbotao}>Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoDemitir}
                            onPress={() => {
                                // alerta para confirmação de demissão
                                Alert.alert('Tem certeza que quer demitir?', 'Ao demitir, o funcionário será excluído totalmente do aplicativo.', [
                                    {
                                        text: 'Cancelar',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'OK', onPress: () => {
                                            db.removeById(funcionarioId);
                                            navigator.navigate('Home')
                                        }
                                    },
                                ])

                                // db.removeById(funcionarioId);
                            }}
                        >
                            <Text style={styles.textbotao}>Demitir</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    boxHeader: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 17,
        marginRight: 17,
        alignItems: 'center',
    },
    profile: {
        alignItems: 'center',
        width: '100%',

    },
    nameBox: {
        marginTop: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    textNameProfile: {
        color: '#5ea629',
        fontSize: 20,
        fontWeight: '500'
    },
    textContratoBox: {
        marginBottom: 10,
    },
    contratoText: {
        fontSize: 30,
        color: '#45791E',
        fontWeight: '300'
    },
    scrollForm: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    form: {
        flexDirection: 'row',
    },
    boxInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    imageIcon: {
        width: 22,
        height: 22,
        marginTop: 2
    },
    input: {
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 0,
        paddingBottom: 1,
        paddingLeft: 8,
        color: 'black',
    },
    quinzena: {
        flexDirection: 'row',
        gap: 3

    },
    text: {
        fontSize: 18,
        color: '#373333',
        paddingTop: 1.8,


    },
    botaoEditar: {
        backgroundColor: '#5ea629',
        borderRadius: 8,
        height: 40,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginTop: 20
    },
    botaoDemitir: {
        backgroundColor: '#E3130B',
        borderRadius: 8,
        height: 40,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginTop: 20
    },
    textbotao: {
        color: 'white',
        fontSize: 18,

    },
    boxBotao: {
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20

    }
});
