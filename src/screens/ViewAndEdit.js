import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';

import useDatabaseConfig from '../database/useDatabaseConfig';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ValeCard from '../components/valeCard';
import { useNavigation } from '@react-navigation/native';

// NÃO APAGAR ESSA TELA, to utilizando pra testes com o banco de dados e as tabelas
// essa tela é temporaria, fiz só pra testar a navegação stack e os metodos de atualização e exclusão
export default function ViewAndEdit( { route } ) {

  // parametro passado na rota
  const funcionarioId = route.params.funcId;

  // states para os campos do funcionário
  const [ nome, setNome ] = useState('');
  const [ cargo, setCargo ] = useState('');
  const [ salario, setSalario ] = useState(0);

  // states para vales
  const [ vales, setVales ] = useState([])
  const [ descricao, setDescricao ] = useState('')
  const [ valor, setValor ] = useState(0)

  // state para controle de edição
  const [ edit, setEdit ] = useState(true);

  // instância das configurações do banco de dados
  const db = useDatabaseConfig();

  // navigator 
  const navigator = useNavigation();

  useEffect(() => {
    db.findById_WithDB(funcionarioId).then((f) => {

      setNome(f.nome);
      setCargo(f.cargo);
      setSalario((f.salario).toString());
      // validação para campo de vales vazio na tabela do bd
      if (f.vales != null) {
        setVales(JSON.parse(f.vales));
      }

    })
    .catch(err => console.log('deu erro aqui no atualizafunc: ' + err))
  },[])

  // função para adicionar novo vale
  function adicionarNovoVale() {
    const vale = {
      descricao: descricao,
      valor: Number(valor),
    }

    let arrayVale = vales;
    arrayVale.push(vale);
    setVales(arrayVale);

    console.log(vales);

    let valesStr = JSON.stringify(vales);

    db.updateVale(funcionarioId, valesStr)
  }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
            <ScrollView style={styles.scrollForm}>
                
              <Text style={styles.text}>Nome</Text>
              <View style={styles.form}>
                <TextInput
                  readOnly={edit}
                  style={styles.input}
                  placeholder={''}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              
              <Text style={styles.text}>Cargo</Text>
              <View style={styles.form}>
                <TextInput
                  readOnly={edit}
                  style={styles.input}
                  value={cargo}
                  onChangeText={setCargo}
                />
              </View>

              <Text style={styles.text}>Salario</Text>
              <View style={styles.form}>
                <TextInput
                readOnly={edit}
                style={styles.input}
                keyboardType='numeric'
                value={salario}
                onChangeText={setSalario}
                />
              </View>

              <View style={styles.btnArea}>
              
                <View style={styles.boxBotao}>
                  <TouchableOpacity style={styles.botao}
                    onPress={() => {
                      db.updateAllFields(nome, cargo, Number(salario), funcionarioId);
                    }}
                  >
                    <Text style={styles.textbotao}>Salvar alterações</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.boxBotao}>
                  <TouchableOpacity style={styles.botao}
                    onPress={() => {
                      setEdit(!edit);
                    }}
                  >
                    <FontAwesome5 name="user-edit" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.boxBotao}>
                    <TouchableOpacity style={styles.botao}
                      onPress={() => {
                        db.removeById(funcionarioId);
                        navigator.navigate('Home');
                      }}
                    >
                      <FontAwesome6 name="trash" color={'white'} size={20}/>
                    </TouchableOpacity>
                </View>
              </View>

              {/* area para visualização dos vales do funcionário */}
              <View style={styles.valeArea}>

                {/* cards templates para testes
                // <ValeCard descricao={"Coca-cola"} preco={9.90}/>
                // <ValeCard descricao={"Emprestimo"} preco={200}/>
                // <ValeCard descricao={"Espetinho de frango"} preco={11.5}/> */}
                

                {/* logica para exibição dos cards do funcionário */}
                {
                  // caso o campo de vales esteja vazio no funcionário, deve exibir somente uma mensagem, caso contrário exibir os componentes do card
                  (vales.length == 0) 
                  ?
                  <Text>Sem vales</Text>
                  :
                  vales.map((v) => (
                    <ValeCard key={Math.random()} descricao={v.descricao} preco={v.valor}/>
                  ))
                }

                <View style={styles.valeForm}>

                  <Text style={styles.subtitle}>Adicionar novo vale: </Text>
                
                  <TextInput
                    style={styles.input}
                    placeholder='Descrição'
                    onChangeText={setDescricao}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder='Preço'
                    keyboardType='numeric'
                    onChangeText={setValor}
                  />
                  
                  <TouchableOpacity style={styles.botao}
                    onPress={() => {
                      // console.log(vales[0]);
                      // console.log(Math.random());
                      adicionarNovoVale()

                    }}
                  >
                    <Text style={styles.textbotao}>Adicionar</Text>
                  </TouchableOpacity>
                </View>

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
  scrollForm: {
    paddingLeft: 50,
    paddingRight: 50

  },
  input: {
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 15,
    color: 'black',
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 5,
    fontSize: 18
  },
  botao:{
    backgroundColor: 'green',
    borderRadius: 50,
    height: 40,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'green'
  },
  textbotao:{
    color: 'white',
    fontSize: 18,
  
  },
  boxBotao:{
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  valeArea: {
    gap: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'green'
  },
  valeForm: {
    width: '90%',
    // backgroundColor: 'blue'
  },
});
