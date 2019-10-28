/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppNavigator from './navigator/AppNavigator';
import store from './store';
import Provider from 'react-redux/lib/components/Provider';

export default class App extends Component<Props> {
    render() {
        /**
         * 将store传递给app框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>;
    }

};


