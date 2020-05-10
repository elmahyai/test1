import React, { Component } from 'react';
import { ScrollView,View, Text, FlatList, ImageBackground } from 'react-native';
import ListDrug from './ListDrug';
import { Input} from './common';
//import {searchWord} from 
import * as fn2 from './algorithm';

class DrugSearch extends Component {
  state = {
    searchword: '',
    searchResults : []
  };
  searchFilterFunction = (text)=> {
    var newData = fn2.searchWord(text)
  
    this.setState({
      searchResults: newData
    });
  };
  renderItem(library) {
    return <ListDrug library={library} />
    
}
  render() {
    const source = require('../../assets/bg.jpg')

    console.log(this.state)
    return (
      <ImageBackground source={source} style={{width: '100%', height: '100%'}}>

      <ScrollView>
        <Text>ابحث عن الدواء بالعربي أو بالإنجليزي حتي لو مكتوب غلط</Text>
        <Input
                     placeholder = "اسم الدواء الذي تبحث عنه"
                     value = {this.state.searchword}
                     onChangeText={text => {
                      this.setState({searchword: text})
                      this.searchFilterFunction(text)}
                     }
                     

                     numberOfLines = {1}
                      />
        <FlatList 
            style = {styles.flatlistStyle}
            data = {this.state.searchResults}
            renderItem = {this.renderItem}
            keyExtractor = {library => library.name}
        />
      </ScrollView>
      </ImageBackground>
    );
  }
}


const styles = {
  errorTextStyle: {
      fontSize: 18,
      alignSelf: 'center',
      color: 'red',
  }, 
  flatlistStyle:{
      flex: 1,
      marginTop: 15,
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      

  }
}

export default DrugSearch;