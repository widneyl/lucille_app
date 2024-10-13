import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';

import useDatabaseConfig from '../database/useDatabaseConfig';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// essa tela é temporaria, fiz só pra testar a navegação stack e os metodos de atualização e exclusão
export default function ViewAndEdit( { route } ) {

  // parametro passado na rota
  const funcionarioId = route.params.funcId;

  // states para os campos do funcionário
  const [ name, setName ] = useState('');
  const [ cargo, setCargo ] = useState('');
  const [ salario, setSalario ] = useState(0);

  // state para controle de edição
  const [ edit, setEdit ] = useState(true);

  // instância das configurações do banco de dados
  const db = useDatabaseConfig();

  useEffect(() => {
    db.findById_WithDB(funcionarioId).then((f) => {

      setName(f.name);
      setCargo(f.cargo);
      setSalario((f.salario).toString());

    })
    .catch(err => console.log('deu erro aqui no atualizafunc: ' + err))
  },[])

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
                  value={name}
                  onChangeText={setName}
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
                      db.updateAllFields(name, cargo, Number(salario), funcionarioId);
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
                      }}
                    >
                      <FontAwesome6 name="trash" color={'white'} size={20}/>
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
  }
});
