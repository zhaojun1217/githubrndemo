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
    Platform,
    Text,
} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from '../navigator/NavigationUtil';
import PopularPage from '../page/PopularPage';
import FavoritePage from '../page/FavoritePage';
import TrendingPage from '../page/TrendingPage';
import MyPage from '../page/MyPage';

const TABS = { // 在这里配置页面的路由
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),

        },
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
};

export default class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        //此处网络请求tab
    }

    _tabNavigator() {
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage,MyPage};// 这里可以根据需要定制显示
        // PopularPage.navigationOptions.tabBarLabel = 'zzz' //动态配置tab属性
        return createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent,
        }));
    }

    render() {
        // NavigationUtil.navigation = this.props.navigation;
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        };
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        if (routes[index].params) {
            const {theme} = routes[index].params;
            // 以最新的更新时间为主 防止被其他地方的修改覆盖掉
            // 下面这个是&不是||  否则会出现改主题只改变一个
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />;
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
