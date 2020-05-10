import React, {Component} from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation
} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../actions';
import { Icon } from 'react-native-elements'
import {Linking} from 'react-native'




  
class ListItem extends Component {

    render() {
        const {messageStyle, phoneStyle} = styles;
        const { question, phone_number, distance, timedif} = this.props.library.item;

        return(
            <View style = {messageStyle}>
                    
                    <Text style={{fontSize:16, fontWeight:"bold", color:"white"}}>
                        {question}
                    </Text>
                    <View style={{flexDirection:"row"}}>
                        <Icon
                        raised
                        name='phone'
                        type='font-awesome'
                        color='darkblue'
                        onPress={() => {
                            console.log(phone_number)
                            Linking.openURL(`tel:+2${phone_number}`)
                        } }/>
                        <View>
                            <Text style={{paddingTop:10, fontSize:10, fontWeight:"bold"}}>
                                صاحب الرسالة يبعد عنك  : {distance} كيلومترا
                            </Text>
                            <Text style={{fontSize:10, fontWeight:"bold"}} >
                                تم اسال الرسالة منذ  : {timedif} 
                            </Text>
                        </View>
                    </View>

            </View>

        )
    };
};

const styles = {
    messageStyle: {
        fontSize: 18,
        paddingLeft:0,
        borderColor: 'darkblue',
        borderWidth: 2, 
        marginBottom: 20
    },
    phoneStyle: {
        flexDirection:"column",
        fontSize: 18,
        marginTop: 5
        
    }

}

const mapStateToProps = state => {
    console.log(state)
    const {
        jobs, 
        latitude,
        longitude
    } = state.libraries
    return {
        jobs: jobs ,
        mylatitude : latitude,
        mylongitude : longitude
     };
};

export default connect(mapStateToProps)(ListItem);