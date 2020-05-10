import React, { Component } from 'react';
import { WebView } from 'react-native';

class FindPdf extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'https://druggo-app.github.io'}}
        style={{marginTop: 0}}
        javaScriptEnabled={true} 
        domStorageEnabled={true}

      />
    );
  }
}
export default FindPdf;