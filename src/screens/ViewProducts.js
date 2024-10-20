import { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet } from "react-native";

import { Vale } from '../entity/Vale';

import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../database/useDatabaseConfig';
import ProductCard from "../components/productCard";
import SearchBar from "../components/searchBar";

export default function ViewProducts() {
    
    // state para aramzenar todos os produtos
    const [produtos, setProdutos] = useState([]);

    // state para armazenar os produtos filtrados
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos); // os produtos filtrados começam recebendo todos os produtos, conforme alguma pesquisa for feita a exibição vai sendo alterada

    const [produtosEscolhidos, setProdutosEscolhidos] = useState([])

    // instância para bd
    const database = useDatabaseConfig();

    useEffect(() => {
        // função para trazer todos os produtos do banco de dados e exibi-los
        async function getAllProducts() {
            const db = await SQLite.openDatabaseAsync(database.databaseOnUse);
            
            try {                
                const allRows = await db.getAllAsync('SELECT * FROM produtos');
      
                setProdutos([]);
                let newArray = [];
                for (const row of allRows) {
                    newArray.push(new Vale(row.id, row.descricao, row.preco))
                }
                setProdutos(newArray);
                setProdutosFiltrados(newArray);
            } catch (error) {
                console.log('deu erro tentando recuperar os produtos: ' + error)
            } finally {
                db.closeAsync();
            }
            
        }

        getAllProducts();

    },[]);

    // função para fazer a filtração dos produtos de acordo com a pesquisa no search
    // vou exportar essa função para o componente para ser usada dentro dele
    const pesquisarPorProduto = (pesquisa) => {
      const filtrados = produtos.filter(item =>
        item.descricao.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setProdutosFiltrados(filtrados);
    };

    // mesmo esquema da função acima, exportei pra outro componente e ela vai sendo chamada conforme os produtos forem selecionados
    const produtosSelecionados = (inserir, produto) => {
        if (inserir) {
            let newArray = []
            newArray = produtosEscolhidos
            newArray.push(produto);
            setProdutosEscolhidos(newArray);
        } else { // se for negativo, significa que o produto nao esta mais selecionado e deve ser retirado dos produtos selecionados
            let index = produtosEscolhidos.findIndex(prod => prod.id === produto.id);
            produtosEscolhidos.splice(index, 1);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                {/* area para fazer pesquisa de produto */}
                <SearchBar pesquisarPor={pesquisarPorProduto} />

                <FlatList
                    data={produtosFiltrados}
                    renderItem={
                        ({item}) => (
                            <ProductCard produtoId={item.id} descricao={item.descricao} preco={item.preco} onSelect={produtosSelecionados} />
                        )
                    }
                    keyExtractor={item => item.id}
                />

                <Button
                    title="Adicionar"
                    onPress={() => {
                        console.log('produtos adicionados no vale:')
                        console.log(produtosEscolhidos);
                    }}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});