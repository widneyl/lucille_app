import { View, Text, StyleSheet } from 'react-native'

export default function Logo() {
    return (
        <View>
            <Text style={styles.lucilleStyleLogo}>Lucille</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    lucilleStyleLogo: {
        color: '#45791E',
        fontSize: 40,
        fontWeight: '500'
    }
});
