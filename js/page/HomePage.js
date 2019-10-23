/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    BackHandler,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import actions from '../action';
import {connect} from 'react-redux';

class HomePage extends Component<Props> {
    /**
     * 处理Android的物理返回键
     * @returns {boolean}
     */
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        // 如果RootNavigator中的MainNavigator的index是1 代表是Main的导航器，在Main页面，所以不拦截
        if (nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    componentDidMount(): void {
        BackHandler.addEventListener('hardwardBackPress', this.onBackPress);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwardBackPress', this.onBackPress);
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
});
export default connect(mapStateToProps)(HomePage);
