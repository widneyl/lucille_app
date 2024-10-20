import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Vale } from "../../entity/Vale";

// componente temporário pra que eu teste algumas funções do produto
export default function ProductCard( { produtoId, descricao, preco, onSelect } ) {
    
    // state pra controlar se o card ta selecionado ou nao
    const [selecionado, setSelecionado] = useState(true)

    const produtosSelecionados = (pro) => {
        onSelect(selecionado, pro);
    }
    
    return (
        <>
            <TouchableOpacity style={(selecionado)?styles.item:styles.selectedItem}
                onPress={() => {
                    setSelecionado(!(selecionado))
                    produtosSelecionados(new Vale(produtoId, descricao, preco));
                }}
            >
                <Text style={styles.title}>{descricao}</Text>
                <Text style={styles.preco}>R$ {(preco).toFixed(2)}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'green',
        padding: 20,
        marginVertical: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    selectedItem: {
        backgroundColor: 'darkgreen',
        padding: 20,
        marginVertical: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: 'white'
    },
    preco: {
        fontSize: 18,
        color: 'white'
    }
});