import React from 'react';
import {TextInput, View, Text} from 'react-native';

const Input = ({label, value, onChangeText, placeholder, secureTextEntry, multiline,numberOfLines }) => {
    const {inputStyle, labelStyle, containerStyle} = styles;
    return (
        //<View style = {containerStyle}>
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder = {placeholder}
                autoCorrect= {false}
                multiline = {multiline}
                numberOfLines = {numberOfLines}
                style = {inputStyle}
                value= {value}
                onChangeText= {onChangeText}
                placeholderTextColor = 'white'

            />
        //</View>
    )



};

const styles = {
    inputStyle: {
        marginTop: 10,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        borderColor: 'darkblue',
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        color: 'white'
        },
    labelStyle: {
        fontSize: 16,
        paddingLeft: 20,
    },
    containerStyle : {
        flex: 1,
        marginTop: 5,
        flexDirection: 'column',
        alignItems: 'center'
    }
};

export {Input};