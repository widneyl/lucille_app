import { ScrollView, StyleSheet, View, Button, TextInput, RefreshControl } from 'react-native';
import EmployeeCard from '../components/employeeCard';
import { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../database/useDatabaseConfig';

// criei essa rota só pra poder visualizar os componentes que estava criando
export default function TemplateHome() {  
  const [ name, setName ] = useState('');
  const [ cargo, setCargo ] = useState('');
  const [ funShow, setFunShow ] = useState([]);
  
  const database = useDatabaseConfig();

  useEffect(() => {
    async function getAll() {
      const db = await SQLite.openDatabaseAsync('testdb');

      const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
      setFunShow([]);
      let newArray = [];
      for (const row of allRows) {
 
        // objeto para guardar funcionario
        const empolyee = {
        id: row.id,
        name: row.name,
        cargo: row.cargo
        };

        newArray.push(empolyee);
        // console.log(empolyee); // Debug para checar o objeto individual
      }
      setFunShow(newArray);
    }

    console.log('funciona logo porra')
    getAll();
    
  },[])

  return (
    // container de fora, equivalente ao container de toda area Home
    <View style={styles.container}> 
      {/* coloquei todos os cards num scrollview, achei mais fácil, mas pode mudar depois */}
      <ScrollView style={styles.scroller}
        showsVerticalScrollIndicator={false}
      >
        {/* criei uma view dentro do scroll para ajustar os cards, sem essa view estavam ficando estourados e desalinhados */}
        <View style={styles.internView}>

          {
            funShow.map((e) => (
              <EmployeeCard key={e.id} nome={e.name} cargo={e.cargo}/>
            ))
          }
          
        </View>

        <View style={styles.formView}>
          <TextInput
            style={styles.inputView} 
            placeholder='Nome'
            onChangeText={setName}
          />
          <TextInput
            style={styles.inputView} 
            placeholder='Cargo'
            onChangeText={setCargo}
          />

          <Button 
            title={'Adicionar novo'}
            onPress={() => {
              database.create(name, cargo);
            }}
          />

          <Button title={'Remover por nome'}
            onPress={() => {
              database.removeByName(name);
            }}
          />
        </View>
      </ScrollView>

    </View>
  );
}

// as configurações de style dos containers dessa rota são necessários para exibir os cards 
const styles = StyleSheet.create({
  // configurações do container para exibição dos cards em formato de lista
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 50,
  },
  scroller: {
    width: '100%',
    // backgroundColor: 'red',
    padding: 10,
  },
  internView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  formView: {
    borderWidth: 2,
    gap: 10,
    padding: 10
  },
  inputView: {
    borderWidth: 1,
    height: 50,
    width: '100%',
    borderRadius: 10,
    padding: 10
  }
});
