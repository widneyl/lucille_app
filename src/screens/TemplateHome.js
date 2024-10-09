import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import EmployeeCard from '../components/employeeCard';

// criei essa rota só pra poder visualizar os componentes que estava criando
export default function TemplateHome() {
  return (
    // container de fora, equivalente ao container de toda area Home
    <View style={styles.container}> 
      {/* text so pra auxiliar */}
      {/* <Text>Aqui ficarao os cards (template)</Text> */}

      {/* coloquei todos os cards num scrollview, achei mais fácil, mas pode mudar depois */}
      <ScrollView style={styles.scroller}
        showsVerticalScrollIndicator={false}
      >
        {/* criei uma view dentro do scroll para ajustar os cards, sem essa view estavam ficando estourados e desalinhados */}
        <View style={styles.internView}>
          <EmployeeCard nome={"Julia Colares"} cargo={"Garçonete"}/>

          <EmployeeCard nome={"Roberto Silva"} cargo={"Garçom"}/>

          <EmployeeCard nome={"Ana Lucia"} cargo={"Cozinheira"}/>

          <EmployeeCard nome={"Cristiano Ronaldo"} cargo={"Barman"}/>

          <EmployeeCard nome={"Carlos Albuquerque"} cargo={"Segurança"}/>

          <EmployeeCard nome={"Maria Fernanda"} cargo={"Recepcionista"}/>

          <EmployeeCard nome={"Felipe Costa"} cargo={"Chef de Cozinha"}/>

          <EmployeeCard nome={"Juliana Moreira"} cargo={"Auxiliar de Limpeza"}/>

          <EmployeeCard nome={"Paulo Henrique"} cargo={"Gerente"}/>

          <EmployeeCard nome={"Isabella Lima"} cargo={"Atendente"}/>

          <EmployeeCard nome={"Lucas Andrade"} cargo={"Auxiliar de Cozinha"}/>

          <EmployeeCard nome={"Beatriz Souza"} cargo={"Supervisora"}/>

          <EmployeeCard nome={"Fernando Oliveira"} cargo={"Caixa"}/>

          <EmployeeCard nome={"Larissa Santos"} cargo={"Hostess"}/>
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
  }
});
