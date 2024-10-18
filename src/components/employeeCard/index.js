import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EmployeeCard( { id, nome, cargo, img } ) {
  const navigate = useNavigation();
  
  return (
    <View style={styles.cardContainer}>
        {/* todo o card esta em volta de um pressable, o que torna o card pressionavel e apto a fazer ações (como redirecionamento para outras páginas) a partir de qualquer clique */}
        <Pressable
            style={styles.container}
            // função pra testar o clique no componente card
            onPress={() => {
              console.log('pressionando o componente com nome de ' + nome)
              navigate.navigate('Vale', { funcId: id }); //Troquei o nome do componente que vai ser chamado, agora esta chamando a rota Vale
            }}
        >
          {/* container da foto de perfil do funcionario */}
          <View style={styles.imageArea}>
              <Image
                  style={styles.tinyLogo}
                  source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png', // imagem temporaria, a imagem sera passada por props
                  }}
              />
          </View>

          {/* container dos textos, nome e cargo do funcionario */}
          <View style={styles.textArea}>
              <Text style={styles.nomeSty}>{ nome }</Text>
              <Text style={styles.cargoSty}>{ cargo }</Text>
          </View>

          {/* container do icone de botao */}
          <View style={styles.btnArea}>
            <MaterialCommunityIcons
              name="greater-than"
              size={30}
              color={"white"}
            />
          </View>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 50,
    width: '100%',
    backgroundColor: '#5ea629',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageArea: {
    // backgroundColor: 'blue',
  },
  textArea: {
    marginLeft: 12,
    // flex: 1,
    // backgroundColor: 'red',
  },
  btnArea: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    // backgroundColor: 'black',
  },
  nomeSty: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  cargoSty: {
    fontSize: 15,
    color: 'white',
  }
});
