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
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';

const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FavoriteDao from '../expand/dao/FavoriteDao';

export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel, flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            sFavorite: projectModel.sFavorite,
        }
        ;
        // this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
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

    onFavoriteButtonClick() {
        const {projectModel, callback} = this.params;
        const sFavorite = projectModel.sFavorite = !projectModel.sFavorite;
        callback(sFavorite); // 更新Item的收藏状态
        this.setState({
            sFavorite: sFavorite,
        });
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.sFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.onFavoriteButtonClick();
                    }}>
                    <FontAwesome
                        name={this.state.sFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {

                })}
            </View>
        );
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
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            title={this.state.title}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={this.renderRightButton()}
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
