import { View, Text, StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfileIcon() {
    return (
        <View style={styles.boxIcon}>
            <AntDesign name='user' size={50} color={'green'} style={styles.icon}/>
        </View>
    )
}


const styles = StyleSheet.create({
    boxIcon: {
        backgroundColor: '#011126',
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 4
        
        
    },
    icon:{
        alignSelf: 'center',
        padding: 5
    }
    
});
