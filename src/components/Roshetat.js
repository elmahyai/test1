import React, { Component } from 'react';
import { WebView } from 'react-native';

class Roshetat extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://druggo-app.github.io/rosheta/index.html'}}
        style={{marginTop: 0}}
        javaScriptEnabled={true} 
        domStorageEnabled={true}

      />
    );
  }
}
export default Roshetat;