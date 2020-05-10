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


class MedicalRep extends Component {
    state = {
        checked: 'apply',
        email : '',
        myname:'',
        faculty: ''

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
        const {checked, email,myname, faculty} = this.state
        if (latitude < 1){
            console.log('nooooooooooo')
            Actions.SetLocation()
            
        } else if (myname.length < 8){
            Alert.alert(
                'تأكد من كتابة الإسم بالكامل'
            )
        } else if (faculty.length < 10){
            Alert.alert(
                'تأكد من كتابة المؤهل وسنة التخرج'
            )
        } else if (phone_number.length < 8){
            Alert.alert(
                'تأكد من إدخال رقم هاتف صحيح'
            )
        } else if (email.length < 12){
            Alert.alert(
                'تأكد من كتابة الإيميل بشكل صحيح'
            )
        } else if (question.length < 70){
            Alert.alert(
                'يجب أن تكتب علي الأقل أربعة جمل عن خبراتك السابقة'
            )
        }
        
        
        else {
            this.props.SEND_LOADING_action(true)

            var time_in_milliseconds = (new Date).getTime();
            db.ref('MedicalRepApplications')
            .push({myname, faculty, question, phone_number,email, latitude,longitude,time_in_milliseconds})
            .then(this.onLoginSuccess.bind(this))
            .then( 
            Alert.alert(
                'DrugGo',
                'تم استقبال النموذج بنجاح. إن شاء الله تتواصل معك أحد شركات الأدوية قريبا ولكن نضمن لكن إذا أعطيتنا خمس نجوم أننا سنبذل أقصي جهدنا لإرسالها إلي اكبر قدر من شركات الأدوية بالتوفيق وفي انتظار أي استفسار علي صفحتنا علي فيسبوك',    
                [
                    {text: 'تم', onPress: () =>  Actions.Welcome() ,
                    style: 'cancel'
                },
                    {
                    text: 'سأعطيكم خمس نجوم',
                    onPress: () => Linking.openURL("market://details?id=com.otc")
                    }
                ],
                {cancelable: false},
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
        const source = require('../../assets/bg.jpg')

        const {dropdownStyle, radioButtonStyle} = styles;
        console.log(this.props)
        return (
            <ImageBackground source={source} style={{width: '100%', height: '100%'}}>

            <Card>
                
                <View style={{flex:2}}>
                

                <Text style = {{color: 'white'}} >زملاءنا الأعزاء ، املأ هذا النموذج مرة واحدة يفضل بالإنجليزية وسيقوم التطبيق بإرساله إلي اكثر من 300 شركة أدوية ومركز طبي</Text>
                
                <Text  style={{paddingTop:5, color: 'white'}}>تفاصيل عنك</Text>


                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "Name"
                     value = {this.state.myname}
                     onChangeText={myname => 
                     this.setState({myname: myname})
                    }

                     numberOfLines = {1}
                      />
                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "المؤهل وسنة التخرج"
                     value = {this.props.faculty}
                     onChangeText={faculty => 
                     this.setState({faculty: faculty})
                    }

                     numberOfLines = {1}
                      />
                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "اكتب هنا خبراتك السابقة اكتب اكبر قدر ممكن"
                     value = {this.props.question}
                     onChangeText={question => 
                     this.props.jobDetails_question(question)
                     
                     }

                     multiline
                     numberOfLines = {10}

                      />
                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "Phone number"
                     value = {this.props.phone_number}
                     onChangeText={phone_number => 
                     this.props.jobDetails_phone_number(phone_number)
                    }

                     numberOfLines = {1}
                      />
                </View>
                <View style={{flex:2}}>
                    <Input
                     placeholder = "Email"
                     value = {this.props.email}
                     onChangeText={email => 
                     this.setState({email: email})
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
})(MedicalRep);