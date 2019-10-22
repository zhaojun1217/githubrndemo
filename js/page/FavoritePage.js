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
    Text, Button,
} from 'react-native';

export default class FavoritePage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到FavoritePage
                </Text>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        navigation.setParams({
                            theme: {
                                tintColor: 'green',
                                updateTime: new Date().getTime(),
                            },
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    },
});
