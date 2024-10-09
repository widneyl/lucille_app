import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Logo from '../components/logo/Logo';
import ProfileIcon from '../components/profileIcon/ProfileIcon';

import TemplateHome from './TemplateHome'

export default function Home() {
  return (
    <View style={styles.container}>

      <View style={styles.boxHeader}>

        <View style={styles.logo}>
          <Logo />
        </View>

        <View style={styles.profileIcon}>
          <TouchableOpacity>
            <ProfileIcon />
          </TouchableOpacity>
        </View>

      </View>
      {/*Implementando o componente com os cards a tela de home */}
      <TemplateHome />
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
  }
});