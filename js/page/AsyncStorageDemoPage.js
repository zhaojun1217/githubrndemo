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
import actions from '../action';
import {connect} from 'react-redux';

const KEY = 'save_key';
export default class AsyncStorageDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    AsyncStorage使用
                </Text>
                <View style={styles.input_container}>
                    <TextInput style={styles.input} onChangeText={text => {
                        this.value = text;
                    }}/>

                </View>
                <View style={styles.input_container2}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>
                        存储
                    </Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>
                        删除
                    </Text>
                    <Text onPress={() => {
                        this.doGetData();
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


    /**
     * 数据存储
     */
    async doSave() {
        // 1
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });
        // // 2
        // AsyncStorage.setItem(KEY, this.value)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        // // 3
        // try {
        //     await AsyncStorage.setItem(KEY, this.value);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    async doRemove() {
        // 1
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        });
        // // 2
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        // // 3
        // try {
        //     await AsyncStorage.removeItem(KEY);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    async doGetData() {
        // 1
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value,
            });
            console.log(value);
            error && console.log(error.toString());
        });
        // // 2
        // AsyncStorage.getItem(KEY)
        //     .then(value => {
        //         this.setState({
        //             showText: value,
        //         });
        //         console.log(value);
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        // // 3
        // try {
        //     const value = await AsyncStorage.getItem(KEY);
        //     this.setState({
        //         showText: value,
        //     });
        //     console.log(value);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
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
        justifyContent:'space-around',
        margin: 10
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
