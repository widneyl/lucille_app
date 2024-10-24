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
        borderRadius: 5,
        backgroundColor: '#5ea629',
        padding: 10,
        marginVertical: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    selectedItem: {
        borderRadius: 5,
        backgroundColor: '#2565E6',
        padding: 10,
        marginVertical: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontSize: 22,
        color: 'white'
    },
    preco: {
        fontSize: 22,
        color: 'white'
    }
});