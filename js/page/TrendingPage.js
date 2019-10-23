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
    Text,
    Button,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';

class TrendingPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到TrendingPage
                </Text>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        this.props.onThemeChange('#096');
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);
