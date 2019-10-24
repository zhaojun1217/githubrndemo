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
} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';

export default class FetchDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        };
    }

    loadData() {
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                    this.setState({
                        showText: responseText,
                    });
                },
            );
    }

    loadData2() {
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok .');
                }
            })
            .then(responseText => {
                    this.setState({
                        showText: responseText,
                    });
                },
            )
            .catch(e => {
                    this.setState({
                        showText: e.toString(),
                    });
                },
            );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Fetch使用
                </Text>
                <View style={styles.input_container}>
                    <TextInput style={styles.input} onChangeText={text => {
                        this.searchKey = text;
                    }}/>
                    <Button
                        title="获取  "
                        onPress={() => {
                            this.loadData2();
                        }}
                    />
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
    input: {
        height: 30,
        flex: 1,
        borderColor: 'green',
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
    },
});
