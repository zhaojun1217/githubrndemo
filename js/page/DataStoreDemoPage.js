/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text, Button,
    AsyncStorage,
} from 'react-native';
import DataStore from '../expand/dao/DataStore';

const KEY = 'save_key';
export default class DataStoreDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次数据价值时间 ： ${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData,
                });
            })
            .catch(error => {
                error && console.log(error.toString());
            });
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    离线缓存框架涉及
                </Text>
                <View style={styles.input_container}>
                    <TextInput style={styles.input} onChangeText={text => {
                        this.value = text;
                    }}/>
                    <Text onPress={() => {
                        this.loadData();
                    }}>
                        获取
                    </Text>
                </View>

                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input_container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
    },
    input: {
        height: 30,
        flex: 1,
        borderColor: 'green',
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },
});
