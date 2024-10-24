import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

// componente de barra de pesquisa para usar na visualização de produtos
export default function SearchBar ({ pesquisarPor }) {
  const [pesquisa, setPesquisa] = useState('');

  const pesquisarPorProduto = (text) => {
    setPesquisa(text);
    if (pesquisarPor) {
      pesquisarPor(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Procurar por produto..."}
        value={pesquisa}
        onChangeText={pesquisarPorProduto}
      />
      <AntDesign name="search1" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
   
    
  },
  input: {
    width: '90%',
    fontSize: 16,
    // paddingHorizontal: 10,
    // borderRadius: 10,
    borderBottomWidth: 1,
    padding: 3,
    marginBottom: 15
    
    
  },
});