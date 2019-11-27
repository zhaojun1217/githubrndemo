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
    TouchableOpacity,
    DeviceInfo,
} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';

const THEME_COLOR = '#678';

export default class WebViewPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {title, url} = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        }
        ;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    onBackPress() {
        this.onBack();
        return true;
    }


    componentDidMount() {
        // this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        // this.backPress.componentWillUnmount();
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        const titleLayoutStyle = this.state.title && this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={{backgroundColor: THEME_COLOR}}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
        />;

        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
});
