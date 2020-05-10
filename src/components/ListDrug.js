import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    LayoutAnimation
} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../actions';
import { Icon } from 'react-native-elements'
import {Linking} from 'react-native'




  
class ListDrug extends Component {
    render() {
        const {messageStyle} = styles
        const {drug_name, drug_pic, genname, genname_info,buy_drug, drug_info} = this.props.library.item
        

        return(
            <View style = {messageStyle}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:"white"}}>
                        {drug_name}
                    </Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:"white"}}>
                        المادة الفعالة {genname}
                    </Text>
                    <View  style={{flexDirection:"row"}}>
                        <Icon
                            raised
                            name='photo'
                            type='font-awesome'
                            color='darkblue'
                            onPress={() => {
                                Linking.openURL(drug_pic)
                            } }/>
                        <Icon
                            raised
                            name='book'
                            type='font-awesome'
                            color='darkblue'
                            onPress={() => {
                                Linking.openURL(genname_info)
                            } }/>
                        <Icon
                            raised
                            name='money'
                            type='font-awesome'
                            color='darkblue'
                            onPress={() => {
                                Linking.openURL(buy_drug)
                            } }/>

                        <Icon
                            raised
                            name='search'
                            type='font-awesome'
                            color='darkblue'
                            onPress={() => {
                                Linking.openURL(drug_info)
                            } }/>
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


export default ListDrug;