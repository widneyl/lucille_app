import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import useDatabaseConfig from '../database/useDatabaseConfig';
import { useState } from 'react';
import { Funcionario } from '../entity/Funcionario';

// criei essa tela pra ficar testando as novas funções que a gente for desenvolvendo no aplicativo
export default function Debug() {
  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')

  const db = useDatabaseConfig();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>area para testes</Text>
      <TextInput
        style={styles.input}
        placeholder='Nome de um funcionário'
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder='Id de um funcionário'
        onChangeText={setId}
      />

      <Button
        title='dropar tabela antiga'
        onPress={() => {
          db.drop();
        }}
      />

      <Button
        title='visualizar todos funcionários no console'
        onPress={() => {
          db.viewAll();
        }}
      />

      <Button
        title='Remover por nome'
        onPress={() => db.removeByName(nome)}
      />

      <Button
        title='Verificar com array'
        onPress={() => {
            // esse método ja retorna o objeto de fato, podendo acessar seus atributos de uma vez
            console.log(db.findById(id))
            // acessando os atributos do funcionário
            console.log(db.findById(id).getNome())
            console.log(db.findById(id).getCargo())
            console.log(db.findById(id).getSalario())
        }}
      />

      <Button
        title='Verificar com DB'
        onPress={() => {
          // para acessar o funcionário pelo id, acessando diretamente pelo banco de dados, tive que criar uma função async
          // (foi a forma mais limpa que eu consegui fazer)
          db.findById_WithDB(id).then((f) => {
            console.log('aqui fora: ' + f.name)

            // o parametro f retorna um objeto literal com todos os atributos do funcionário
            // para guardar em um objeto funcionario, basta fazer o seguinte ---->
            let objFunc = new Funcionario(f.id, f.name, f.cargo, f.salario)
            console.log('objeto funcionario: ')
            console.log(objFunc);
            // com esse objeto será possível acessar todos os atributos do funcionário

            // (talvez seja melhor procurar uma forma melhor de fazer a procura por funcionários e retornar seus atributos)

          })
          .catch((err) => {
            console.log('nao achou nenhum funcionario')
          })
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 15,
    color: 'black',
  },
});
