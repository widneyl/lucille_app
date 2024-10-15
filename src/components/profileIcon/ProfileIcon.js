import { View, StyleSheet, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import profileIcon from '../../img/user2.png'

export default function ProfileIcon() {
    return (
        <View style={styles.boxIcon}>
            <Image 
                style={styles.icon}
                source={profileIcon}
            ></Image>
        </View>
    )
}


const styles = StyleSheet.create({
    boxIcon: {
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10
    },
    icon: {
        alignSelf: 'center',
        width: 65,
        height: 65,
    }

});
