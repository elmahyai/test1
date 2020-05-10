import React, {Component} from 'react';
import {PermissionsAndroid, View, Text, Picker, ImageBackground} from 'react-native'
import {Button, Card, CardSection, Input, Spinner} from './common';

import LibraryList from '../components/LibraryList';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {
    jobsFetch,
    jobreciever_job_group,
    jobreciever_job_title,
    GET_LATITUDE_action,
    GET_LONGITUDE_action,
    RECIEVE_LOADING_action
} from '../actions';
import { db } from '../config/db';
import {Actions} from 'react-native-router-flux'
import { RadioButton } from 'react-native-paper';


class AnswersForm extends Component {
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
    
    
    snapshotToArray = (snapshot) => {
        var returnArr = [];
      
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
      
            returnArr.push(item);
        });
      
        return returnArr;
      };

    onButtonPress (){
        const {
            jobrecieved_group, 
            jobrecieved_title, 
            latitude,
            longitude,
        } = this.props


        const {checked} = this.state

        console.log({jobrecieved_group,jobrecieved_title, latitude,longitude})
        if (latitude > 0){
            this.props.RECIEVE_LOADING_action(true)

            db.ref(`/${checked}/${jobrecieved_group}/${jobrecieved_title}`)
            .on('value', snapshot => {
                this.props.jobsFetch(this.snapshotToArray(snapshot),latitude,longitude)
                this.props.RECIEVE_LOADING_action(false)})
        } else {
            Actions.SetLocation()
        }
       
                    
                
       

        
    }


    renderButton(){
        
        if (this.props.recieve_loading) {
            return <Spinner size="small"/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>اعرض النتائج</Button>
        );
    }




    render() {
        const { checked } = this.state;
        const source = require('../../assets/bg.jpg')

        const {dropdownStyle, radioButtonStyle} = styles;
        console.log(this.props)
        return (
            <ImageBackground source={source} style={{width: '100%', height: '100%'}}>
            <Card>
                
                <View style={{flex:2}}>
                <View style={{marginLeft:30, paddingBottom:10}}>
                    <View style= {radioButtonStyle}>
                    <RadioButton
                    value="offer"
                    status={checked === 'offer' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'offer' }); }}
                    />
                    <Text style={{paddingTop:5, color: 'white'}}>الوظائف المعروضة</Text>
                    </View>

                    <View style= {radioButtonStyle}>
                    <RadioButton
                    value="apply"
                    status={checked === 'apply' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'apply' }); }}
                    />
                    <Text style={{paddingTop:5, color: 'white'}}>الباحثين عن عمل</Text>
                    </View>


                </View>
                <Text style={{color: 'white'}}>اختر مكان العمل</Text>

                <CardSection>
                    <Picker
                        selectedValue={this.props.jobrecieved_group}
                        style={dropdownStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.jobreciever_job_group(itemValue)
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
                <Text  style={{ paddingTop:10, color: 'white'}}>نوع الوظيفة</Text>

                <CardSection>
                    <Picker
                        selectedValue={this.props.jobrecieved_title}
                        style={dropdownStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.jobreciever_job_title(itemValue)

                        }>
                        <Picker.Item label="صيدلي" value="pharmacist" />
                        <Picker.Item label="مساعد صيدلي" value="pharmacist_assistant" />
                        <Picker.Item label="تمريض" value="nurse" />
                        <Picker.Item label="موظف استقبال" value="receptionist" />
                        <Picker.Item label="فني معمل" value="technition_lab" />
                        <Picker.Item label="فني أشعة" value="technition_radiology" />
                        <Picker.Item label="توصيل منتجات" value="delivery" />
                        <Picker.Item label="أخري" value="others" />
                    </Picker>
                </CardSection>

                </View>
                <View style = {{paddingTop : 15}}>
                    {this.renderButton()}
                </View>
                <View>
                    <LibraryList />
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
        fontSize: 18},
    radioButtonStyle:{
        flexDirection:'row'
    }
}


const mapStateToProps = state => {
    const {
        jobrecieved_group, 
        jobrecieved_title, 
        latitude,
        longitude,
        recieve_loading
    } = state.libraries
    return {
        jobrecieved_group:jobrecieved_group,
        jobrecieved_title: jobrecieved_title,
        latitude:latitude,
        longitude:longitude,
        recieve_loading:recieve_loading

    };
};
// const mapDispatchToProps = dispatch => {
//     return {
//       jobsFetch : () => dispatch(jobsFetch())
//     }
//   }

export default connect(mapStateToProps, {
    jobsFetch,
    jobreciever_job_group,
    jobreciever_job_title,
    GET_LATITUDE_action,
    GET_LONGITUDE_action,
    RECIEVE_LOADING_action
})(AnswersForm);