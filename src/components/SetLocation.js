import React, { Component } from 'react';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import {Alert, Text, ScrollView, ImageBackground} from 'react-native';
import {
    GET_LATITUDE_action,
    GET_LONGITUDE_action
} from '../actions';
//import {Button, Card, CardSection, Input, Spinner} from './common';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
//<Text style={styles.headerText}>من فضلك حدد موقعك الجغرافي</Text>

class SetLocation extends Component {
  render() {
    const source = require('../../assets/bg.jpg')

    return (
        <ImageBackground source={source} style={{width: '100%', height: '100%'}}>

        <MenuProvider style={{ flexDirection: "column", padding: 30 }}>

        <Menu onSelect={(value) =>  {
         this.props.GET_LATITUDE_action(value.lat)
         this.props.GET_LONGITUDE_action(value.lng)
         Alert.alert(
            'DrugGo',
            'تم تحديد الموقع بنجاح.',    
            [
                {text: 'أوك', onPress: () =>  Actions.Welcome()},
                {
                text: 'إعادة إختيار الموقع',
                onPress: () => Actions.SetLocation(),
                style: 'cancel'
                }
            ],
            {cancelable: false},
        );
        }
        }>
          <MenuTrigger  >
            <Text style={styles.headerText}>إضغط هنا لاختيار المحافظة</Text>
          </MenuTrigger  >
          <MenuOptions>
          <ScrollView style={{ maxHeight: 300 }}>

            <MenuOption value={{lat: 30.07708, lng: 31.285909}}>
                <Text style={styles.menuContent}>القاهرة</Text>  
            </MenuOption>
            <MenuOption value={{lat: 31.215645,lng: 29.955266}}>
                <Text style={styles.menuContent}>الإسكندرية</Text> 
            </MenuOption>
            <MenuOption value={{lat: 30.008079, lng: 31.210931}}>
                <Text style={styles.menuContent}>الجيزة</Text>  
            </MenuOption>
            <MenuOption value={{lat: 30.604272, lng: 32.272252}}>
                <Text style={styles.menuContent}>الإسماعيلية</Text>
            </MenuOption>
            <MenuOption value={{lat: 31.256541, lng: 32.284115}}>
                <Text style={styles.menuContent}>بورسعيد</Text>
            </MenuOption>
            <MenuOption value={{lat: 25.695858, lng: 32.643592}}>
                <Text style={styles.menuContent}>الأقصر</Text> 
            </MenuOption>
            <MenuOption value={{lat: 26.556952, lng: 31.694785 }}>
                <Text style={styles.menuContent}>سوهاج</Text> 
            </MenuOption>
            <MenuOption value={{lat: 31.036373, lng: 31.380691}}>
                <Text style={styles.menuContent}>الدقهلية</Text> 
            </MenuOption>
            <MenuOption value={{lat: 29.973714, lng: 32.526267}}>
                <Text style={styles.menuContent}>السويس</Text> 
            </MenuOption>
            <MenuOption value={{lat: 28.109884, lng: 30.750299}}>
                <Text style={styles.menuContent}>المنيا</Text>
            </MenuOption>
            <MenuOption value={{lat: 31.032821, lng: 30.42527}}>
                <Text style={styles.menuContent}>البحيرة</Text> 
            </MenuOption>
            <MenuOption value={{lat: 29.074409, lng: 31.097848}}>
                <Text style={styles.menuContent}>بني سويف</Text> 
            </MenuOption>
            <MenuOption value={{lat: 27.180956, lng: 31.183683}}>
                <Text style={styles.menuContent}>أسيوط</Text> 
            </MenuOption>
            <MenuOption value={{lat: 30.788471, lng: 31.001921}}>
                <Text style={styles.menuContent}>طنطا</Text> 
            </MenuOption>
            <MenuOption value={{lat: 29.309949, lng: 30.841804}}>
                <Text style={styles.menuContent}>الفيوم</Text> 
            </MenuOption>
            <MenuOption value={{lat: 24.093433, lng: 32.907038}}>
                <Text style={styles.menuContent}>أسوان</Text> 
            </MenuOption>
            <MenuOption value={{lat: 26.164179, lng: 32.72671}}>
                <Text style={styles.menuContent}>قنا</Text> 
            </MenuOption>
            <MenuOption value={{lat: 31.12866, lng: 33.797117}}>
                <Text style={styles.menuContent}>شمال سيناء</Text> 
            </MenuOption>
            <MenuOption value={{lat: 30.459065, lng: 31.178577}}>
                <Text style={styles.menuContent}>القليوبية</Text> 
            </MenuOption>
            <MenuOption value={{lat: 31.114304, lng: 30.940116}}>
                <Text style={styles.menuContent}>كفر الشيخ</Text> 
            </MenuOption>
            <MenuOption value={{lat: 31.352539, lng: 27.245275}}>
                <Text style={styles.menuContent}>مطروح</Text> 
            </MenuOption>
            <MenuOption value={{lat: 25.451405, lng: 30.546346}}>
                <Text style={styles.menuContent}>الوادي الجديد</Text> 
            </MenuOption>
            <MenuOption value={{lat: 26.729177, lng: 33.936511}}>
                <Text style={styles.menuContent}>البحر الأحمر</Text> 
            </MenuOption>
            <MenuOption value={{lat: 28.236381, lng: 33.625404 }}>
                <Text style={styles.menuContent}>جنوب سينا</Text> 
            </MenuOption>
            <MenuOption value={{lat: 30.552581, lng: 31.009035}}>
                <Text style={styles.menuContent}>المنوفية</Text> 
            </MenuOption>
            <MenuOption value={{lat: 31.416477, lng: 31.813316}}>
                <Text style={styles.menuContent}>دمياط</Text> 
            </MenuOption>
            <MenuOption value={{lat: 30.587676, lng: 31.501997}}>
                <Text style={styles.menuContent}>الشرقية</Text> 
            </MenuOption>
            </ScrollView>

          </MenuOptions>

        </Menu>
        

      </MenuProvider>
      </ImageBackground>

    );
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
})(SetLocation);

//     
