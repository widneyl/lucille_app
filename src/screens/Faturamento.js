import { StyleSheet, Text, View } from 'react-native';

export default function Faturamento() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faturamento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});
