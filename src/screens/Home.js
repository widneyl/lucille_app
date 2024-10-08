import { StyleSheet, Text, View } from 'react-native';

import Logo from '../components/logo/Logo';
import ProfileIcon from '../components/profileIcon/ProfileIcon';

export default function Home() {
  return (
    <View style={styles.container}> 
      
      <View style={styles.boxHeader}>    

        <View style={styles.logo}>
          <Logo/>
        </View>

        <View style={styles.profileIcon}>
          <ProfileIcon/> 
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  boxHeader:{
    marginTop: 50,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
