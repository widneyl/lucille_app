import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../components/logo/Logo';
import ProfileImage from '../img/profileIconEdit.png'




export default function Profile() {


  return (
    <View style={styles.container}>

      <View style={styles.boxHeader}>
        <Logo />
      </View>
      <TouchableOpacity style={styles.profile}>
        <Image
          source={ProfileImage}
          style={{ width: '40%' }}
        />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView style={styles.scrollForm}>
          <Text style={styles.text}>Nome</Text>
          <TouchableOpacity

          >
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={''}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Data de admissão</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
            />
          </View>
          <Text style={styles.text}>Cargo</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
            />
          </View>
          <Text style={styles.text}>Salario</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.quinzena}>
            <View>
              <Text style={styles.text}>Proxima quinzena</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                />
              </View>
            
            </View>

            <View style={styles.boxBotao}>
              <TouchableOpacity style={styles.botao}>
                <Text style={styles.textbotao}>Contratar</Text>
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
  boxHeader: {
    marginTop: 50,
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
  quinzena: {
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
