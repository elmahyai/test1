import React, { Component } from 'react';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {Alert, Text,PermissionsAndroid, View, ImageBackground} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import Geolocation from 'react-native-geolocation-service';

import {
    GET_LATITUDE_action,
    GET_LONGITUDE_action
} from '../actions';
//import {Button, Card, CardSection, Input, Spinner} from './common';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
//<Text style={styles.headerText}>من فضلك حدد موقعك الجغرافي</Text>

class LocationForm extends Component {
    hasLocationPermission = async () => {
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
        Alert.alert(
            'لم نتمكن من تحديد الموقع باستخدام ال جي بي اس، من فضلك اختار المحافظة'
        )
        Actions.SetLocation()
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
      }
      getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
        if (!hasLocationPermission) return;
        Geolocation.getCurrentPosition(
            (position) => {

                const json_data = JSON.stringify(position, null, 4)
                obj = JSON.parse(json_data)
                const {latitude, longitude} = obj.coords
                this.props.GET_LATITUDE_action(latitude)
                this.props.GET_LONGITUDE_action(longitude)
                
                Alert.alert(
                    'تم تحديد موقعك بشكل سليم'
                )
                Actions.Welcome()
            },
            (error) => {
              console.log(error);

            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
          );
        console.log('no location setted');

        
      }
  render() {
    const source = require('../../assets/bg.jpg')

    return (
        <ImageBackground source={source} style={{width: '100%', height: '100%'}}>
        <Card>
            <View style = {{flex : 1}}>
            <Button onPress={this.getLocation}>حدد موقعي باستخدام GPS</Button>
            </View>
            <View style = {{flex : 7}}>
            </View>
            
        </Card>
        </ImageBackground>
    )
  }
}

//<Button onPress={console.log(this.props)} title="حدد موقعي"></Button>

const styles = {
    headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
    color:"white"
  },
  menuContent: {
    color: "#000",
    fontWeight: "bold",
    padding: 2,
    fontSize: 20
  }
};

const mapStateToProps = state => {
    const {
        latitude,
        longitude
    } = state.libraries
    return {
        latitude:latitude,
        longitude:longitude

    };
};

export default connect(mapStateToProps,  {
    GET_LATITUDE_action,
    GET_LONGITUDE_action
})(LocationForm);

//     
