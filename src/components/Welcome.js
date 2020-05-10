import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Welcome extends Component {
    render() {
        const source = require('../../assets/bg.jpg')
        return(
            <ImageBackground source={source} style={{width: '100%', height: '100%'}}>

            <Card>
                <View style={styles.containerStyle}>
                    <Button  onPress = {() => {Actions.DrugSearch()}}>الباحث السحري</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress = {() => {Actions.QuestionForm()}}>البحث عن وظيفة</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress = {() => {Actions.QuestionFormOffer()}}>البحث عن موظفين</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress = {() => {Actions.MedicalRep()}}>Medical Rep Jobs Easy</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress ={() => {Actions.AnswersForm()}}> تصفح الوظائف الحالية والباحثين عن عمل</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress ={() => {Actions.FindPdf()}}>أفضل تجميعات الأدوية</Button>
                </View>
                <View style={styles.containerStyle}>
                    <Button  onPress = {() => {Actions.Roshetat()}}>تدريب روشتات</Button>
                </View>
                

                <View style={styles.restofpageStyle}>

                </View>

            </Card>
            </ImageBackground>


        )
    }

}

const styles = {
    containerStyle: {
        flex: 1,
        borderColor: '#ddd',
        borderButtomWidth: 0,
        shaddowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation : 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        allignItems:"center"
    },
    restofpageStyle:{
        flex:2
    }
};


export default Welcome;