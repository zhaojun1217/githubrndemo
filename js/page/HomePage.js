/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    BackHandler,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import actions from '../action';
import {connect} from 'react-redux';
import BackPressComponent from '../common/BackPressComponent';
import CustomTheme from './CustomTheme';

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: this.onBackPress()});
    }


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

    renderCustomThemeView() {
        const {customThemeViewVisible, onShowCustomThemeView} = this.props;
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={() => onShowCustomThemeView(false)}
        />)
    }

    componentDidMount(): void {
        BackHandler.addEventListener('hardwardBackPress', this.onBackPress);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwardBackPress', this.onBackPress);
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={{flex: 1}}>
            <DynamicTabNavigator/>
            {this.renderCustomThemeView()}
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
});
const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
