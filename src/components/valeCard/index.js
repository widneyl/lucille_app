import { View, TextInput, StyleSheet } from "react-native";

// componente de card temporario para testes de inserção de novos cards no funcionário
// (favor ignorar o design pavoroso)
export default function ValeCard( { descricao, preco } ) {
    
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputDesc}
                    readOnly={true}
                    value={descricao}
                />

                <TextInput
                    style={styles.inputPrec}
                    readOnly={true}
                    value={"R$ " + (preco).toString()}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    //   backgroundColor: '#424242',
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderRadius: 2,
      flex: 1,
      columnGap: 3
    },
    inputDesc: {
        flex: 2,
        textAlign: 'center',
        color: 'black',
        padding: 3,
        fontSize: 16,
        borderWidth: 1.4,
        borderRadius: 3,
        borderColor: '#A3A3A3',
        backgroundColor: '#C9C9C9'
    },
    inputPrec: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
        padding: 3,
        borderWidth: 1,
        fontSize: 16,
        justifyContent: 'center',
        borderWidth: 1.4,
        borderRadius: 3,
        borderColor: '#A3A3A3',
        backgroundColor: '#C9C9C9'
    }
});