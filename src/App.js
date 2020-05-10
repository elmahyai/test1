import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Routes from './Route';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
class App extends Component {
    render() {
        const store = createStore(reducers, {},applyMiddleware(ReduxThunk))
        return (
            <Provider store = {store}>
                <Routes />

            </Provider>
        );
    };
}

export default App;
//
//</ScrollView>