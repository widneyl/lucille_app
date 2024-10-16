import { ScrollView, StyleSheet, Text, View } from 'react-native';
import EmployeeCard from '../employeeCard';
import { useCallback, useState } from 'react';

import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { Funcionario } from '../../entity/Funcionario';
import useDatabaseConfig from '../../database/useDatabaseConfig';

// criei essa rota só pra poder visualizar os componentes que estava criando
export default function ViewEmployeeCards() {  
  const [ funShow, setFunShow ] = useState([]);

  // instância para usar o banco de dados
  const database = useDatabaseConfig();

  // a funão getAll vai ficar fora do useEffect, pois vai ser chamada em um useFocusEffect agora
  const getAll = async () => {
    // coloquei a chamada do db dentro de um try catch para caso não houver nenhum funcionário cadastrado não surgir um erro
    try {
      const db = await SQLite.openDatabaseAsync(database.databaseOnUse);
  
      const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
  
      setFunShow([]);
      let newArray = [];
      for (const row of allRows) {
        
        // mudei de objeto literal para o objeto funcionario da entidade
        newArray.push(new Funcionario(row.id, row.name, row.cargo, row.salario))
        // console.log(empolyee); // debug para checar o objeto individual
      }
      setFunShow(newArray);
    } catch (error) {
      console.log('deu um erro: ' + error);
      setFunShow([]);
    }
  };

  // toda vez que o templateHome estiver em focus vai chamar um callBack que chama a função getAll()
  useFocusEffect(
    useCallback(() => {
        console.log('to aqui');
        getAll(); // chamando o getAll() pra atualizar os funcionarios exibidos
    }, [])
  );

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
            (funShow.length == 0) ?
            <>
              {/* depois aplicar algum estilo pra mensagem ficar mais bonitinha */}
              <Text>Nenhum funcionário cadastrado!</Text> 
            </>
            :
            funShow.map((e) => (
              <EmployeeCard key={e.id} id={e.id} nome={e.nome} cargo={e.cargo}/>
            ))
          }
          
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

    //Diminui o padding da esquerda e direita de 50 pra 30, para que os cards fiquem mais largos
    paddingLeft: 30,
    paddingRight: 30,
    //Padding top de 10 para ficar mais proximo dos icones de perfil e da logo
    paddingTop: 10,

    //Aumentei o padding de Bottom para que o ultimo carde fique completamente visivel
    paddingBottom: 60
  },
  scroller: {
    width: '100%',
    // backgroundColor: 'red',

    //Diminui o padding de 10 pra 8
    padding: 8,
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
