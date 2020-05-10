import React from 'react';
import {View} from 'react-native';


const WelcomeCardSection = (props) => {
    console.log('hi from welcomecardsec')
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles  = {
    containerStyle: {
        borderBottomWidth : 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        borderColor: 'darkblue',
        borderWidth: 2,
        marginBottom:10
    }
}
export { WelcomeCardSection };