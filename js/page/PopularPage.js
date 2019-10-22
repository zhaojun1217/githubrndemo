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
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DetailPage from './DetailPage';

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['java', 'android', 'react', 'react-native', 'php', 'flutter'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab{...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const TobNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: '#456', // tabBar 背景色
                },
                indicatorStyle: styles.indicatorStyle,// 指示器的标签样式
                labelStyle: styles.labelStyle,
            },
        }));
        return <View style={{flex: 1, marginTop: 50}}>
            <TobNavigator/>
        </View>;
    }
}

class PopularTab extends Component<Props> {
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{tabLabel}</Text>
                <Text onPress={() => {
                    NavigationUtil.goPage({navigation: this.props.navigation}, 'DetailPage');
                }}>跳转到详情页</Text>
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
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
});
