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
import actions from '../action';
import {connect} from 'react-redux';

class MyPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到MyPage
                </Text>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        // navigation.setParams({
                        //     theme: {
                        //         tintColor: 'blue',
                        //         updateTime: new Date().getTime()
                        //     }
                        // })
                        this.props.onThemeChange('rgba(14,255,255,0.98)');
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
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
