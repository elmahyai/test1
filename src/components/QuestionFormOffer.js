import React, {Component} from 'react';
import {PermissionsAndroid,Linking,
    Picker, Text, View, Alert,ImageBackground} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import { db } from '../config/db';
import Geolocation from 'react-native-geolocation-service';
import { CheckBox } from 'react-native-elements'
import {
    jobDetails_job_group,
    jobDetails_job_title,
    jobDetails_question,
    jobDetails_phone_number,
    jobDetails_contact_me,
    GET_LATITUDE_action,
    GET_LONGITUDE_action,
    SEND_LOADING_action
} from '../actions';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import { RadioButton } from 'react-native-paper';


class QuestionFormOffer extends Component {
    state = {
        checked: 'offer',
      };
    componentDidMount(){
        const {
            latitude
        } = this.props
        if (latitude < 1){
            console.log('nooooooooooo')
            Actions.LocationForm()
        } 
        //this.getLocation()
    }
    

    onButtonPress() {
        const {
            job_group, 
            job_title, 
            question,
            phone_number, 
            contact_me,
            latitude,
            longitude
        } = this.props
        const {checked} = this.state
        if (latitude < 1){
            console.log('nooooooooooo')
            Actions.SetLocation()
            
        } else if (phone_number.length < 8){
            Alert.alert(
                'تأكد من إدخال رقم هاتف صحيح'
            )
        } else if (question.length < 50){
            Alert.alert(
                'يجب أن تكتب علي الأقل جملتين عنك أو عن الوظيفة مثلا المرتب'
            )
        }
        
        
        else {
            this.props.SEND_LOADING_action(true)

            var time_in_milliseconds = (new Date).getTime();
            db.ref(`/${checked}/${job_group}/${job_title}`)
            .push({question, phone_number, latitude,longitude,time_in_milliseconds})
            .then(this.onLoginSuccess.bind(this))
            .then( Alert.alert(
                'تم إرسال الإعلان :)'
            ))
            .then(Actions.Welcome())
            console.log('yeees')
        } 
        
    }
    
    onLoginSuccess() {
        this.props.SEND_LOADING_action(false)

    }

    renderButton(){
        
        if (this.props.send_loading) {
            return <Spinner size="small"/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>أرسل الطلب</Button>
        );
    }
    
    render (){
        const { checked } = this.state;
        const source = require('../../assets/bg.jpg')

        const {dropdownStyle, radioButtonStyle} = styles;
        console.log(this.props)
        return (
            <ImageBackground source={source} style={{width: '100%', height: '100%'}}>

            <Card>
                
                <View style={{flex:2}}>
                

                <Text style = {{color: 'white'}} >اختر مكان العمل</Text>
                <CardSection>
                    <Picker
                        selectedValue={this.props.job_group}
                        style={dropdownStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.jobDetails_job_group(itemValue)
                        }>
                        <Picker.Item label="صيدلية" value="pharmacy" />
                        <Picker.Item label="مستشفي أو مركز طبي" value="hospital" />
                        <Picker.Item label="عيادة طبيب" value="clinic" />
                        <Picker.Item label="مركز تجميل" value="tagmel" />
                        <Picker.Item label="شركة" value="company" />
                        <Picker.Item label="رعاية صحية منزلية كإعطاء الحقن والكشف المنزلي" value="free" />
                        <Picker.Item label="أخري" value="others" />
                    </Picker>
                </CardSection>
                <Text style = {{color: 'white'}}>نوع الوظيفة</Text>

                <CardSection>
                    <Picker
                        selectedValue={this.props.job_title}
                        style={dropdownStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.jobDetails_job_title(itemValue)

                        }>
                        <Picker.Item label="صيدلي" value="pharmacist" />
                        <Picker.Item label="مساعد صيدلي" value="pharmacist_assistant" />
                        <Picker.Item label="مندوب مبيعات" value="rep" />
                        <Picker.Item label="تمريض" value="nurse" />
                        <Picker.Item label="موظف استقبال" value="receptionist" />
                        <Picker.Item label="فني معمل" value="technition_lab" />
                        <Picker.Item label="فني أشعة" value="technition_radiology" />
                        <Picker.Item label="توصيل منتجات" value="delivery" />
                        <Picker.Item label="أخري" value="others" />
                    </Picker>
                </CardSection>
                <Text  style={{paddingTop:5, color: 'white'}}>تفاصيل عن الوظيفة او المتقدم لها</Text>


                </View>

                <View style={{flex:2}}>
                    <Input
                     placeholder = " من فضلك اكتب معلومات مختصرة عن الوظيفة أو المتقدم لها"
                     value = {this.props.question}
                     onChangeText={question => 
                     this.props.jobDetails_question(question)
                     
                     }

                     multiline
                     numberOfLines = {4}

                      />
                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "رقم هاتف للتواصل"
                     value = {this.props.phone_number}
                     onChangeText={phone_number => 
                     this.props.jobDetails_phone_number(phone_number)
                    }

                     numberOfLines = {1}
                      />
                </View>
                

                
                    <View  style={{paddingTop:10}}>
                    {this.renderButton()}

                    </View>
  

            </Card>
            </ImageBackground>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red',
    }, 
    dropdownStyle:{
        flex: 1,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
    },
    radioButtonStyle:{
        flexDirection:'row'
    }
}

const mapStateToProps = state => {
    const {
        job_group, 
        job_title, 
        question,
        phone_number, 
        contact_me,
        latitude,
        longitude,
        send_loading
    } = state.libraries
    return {
        job_group:job_group,
        job_title: job_title,
        question:question,
        phone_number:phone_number,
        contact_me:contact_me,
        latitude:latitude,
        longitude:longitude,
        send_loading:send_loading

    };
};

export default connect(mapStateToProps,  {
    jobDetails_job_group,
    jobDetails_job_title,
    jobDetails_question,
    jobDetails_phone_number,
    jobDetails_contact_me,
    GET_LATITUDE_action,
    GET_LONGITUDE_action,
    SEND_LOADING_action
})(QuestionFormOffer);