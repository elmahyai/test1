import React from 'react';
import {View, ScrollView} from 'react-native';

const Card = (props) => {
    return (
        <ScrollView style={styles.containerStyle}>
            {props.children}
        </ScrollView>
    );

};

const styles = {
    containerStyle: {
        flex: 1,
        borderButtomWidth: 0,
        shaddowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};




export { Card };