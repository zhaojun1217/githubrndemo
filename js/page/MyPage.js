/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME_COLOR = '#678';

class MyPage extends Component<Props> {
    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                }}
            >
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>

            </TouchableOpacity>
        </View>;
    }

    getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callBack}>
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}/>
        </TouchableOpacity>;
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{backgroundColor: THEME_COLOR}}
                rightButton={this.getRightButton()}
                leftButton={this.getLeftButton()}
            />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <Text style={styles.welcome}>MyPage</Text>
                <Button
                    title="改变主题色"
                    onPress={() => {
                        // let {dispatch} = NavigatorUtil.navigation;
                        // dispatch(onThemeChange('red'))
                        this.props.onThemeChange('#62a');
                    }}
                />
                <Text onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                    }, 'DetailPage');
                }}>跳转到详情页</Text>
                <Button
                    title={'Fetch 使用'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, 'FetchDemoPage');
                    }}/>
                <Button
                    title={'AsyncStorage 使用'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, 'AsyncStorageDemoPage');
                    }}/>
                <Button
                    title={'离线缓存框架'}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, 'DataStoreDemoPage');
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
