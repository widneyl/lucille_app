import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Vale } from '../entity/Vale';

import * as SQLite from 'expo-sqlite';
import useDatabaseConfig from '../database/useDatabaseConfig';
import ProductCard from "../components/productCard";
import SearchBar from "../components/searchBar";
import { TouchableOpacity } from "react-native-gesture-handler";

// criei essa tela pra exibir todos os produtos que foram armazenados no bd na tabela produtos
// o design que fiz foi só pra ficar mais apresentável, deve passar por mudanças e ser adaptado ao do figma
export default function ViewProducts({ route }) {

    // guardando o id e vales do funcionário que recebidos por parametros
    const funcionarioId = route.params.funcId;
    const vales = route.params.vale;

    // state para aramzenar todos os produtos
    const [produtos, setProdutos] = useState([]);

    // state para armazenar os produtos filtrados
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos); // os produtos filtrados começam recebendo todos os produtos, conforme alguma pesquisa for feita a exibição vai sendo alterada

    // state para armazenar os produtos que o usuário escolheu ao clicar no componente
    const [produtosEscolhidos, setProdutosEscolhidos] = useState([])

    // instância para bd
    const database = useDatabaseConfig();

    // navigator para voltar pra tela de visualizar funcionário
    const navigator = useNavigation();

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

    }, []);

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

    // a atualização do vale vai ser feita nessa tela mesmo ao clicar em adicionar
    const atualizarVale = () => {
        let arrayVale = vales.concat(produtosEscolhidos);
        // console.log(arrayVale)

        let strVale = JSON.stringify(arrayVale);

        database.updateVale(funcionarioId, strVale);

        // depois do update, o navigator deve redirecionar para tela anterior automaticamente
        navigator.goBack();
    }

    return (
        <>
            <View style={styles.container}>
                {/* area para fazer pesquisa de produto */}
                <SearchBar pesquisarPor={pesquisarPorProduto} />

                
                    <View style={styles.listProduct}>
                        <FlatList
                            data={produtosFiltrados}
                            renderItem={
                                ({ item }) => (
                                    <ProductCard produtoId={item.id} descricao={item.descricao} preco={item.preco} onSelect={produtosSelecionados} />
                                )
                            }
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.Button}
                        onPress={() => {
                            console.log('produtos adicionados no vale:')
                            // console.log(produtosEscolhidos);
                            atualizarVale();
                        }}

                    >
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white'
    },
    listProduct: {
        height: '75%'
    },
    Button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#011126',
        width: '50%',
        marginTop: 15,
        borderRadius: 5,
        padding: 6,
        height: 50
    },
    textButton: {
        color: 'white',
        fontSize: 22,

    }
});