import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});