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
    Platform,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import PopularItem from '../common/PopularItem';
import actions from '../action/index';
import Toast from 'react-native-easy-toast';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import TrendingItem from '../common/TrendingItem';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = `&sort=stars`;
const THEME_COLOR = '#678';

export default class FavoritePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['最热', '趋势'];
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />;
        const TobNavigator = createAppContainer(createMaterialTopTabNavigator({
            'Popular': {
                screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                navigationOptions: {
                    title: '最热',
                },
            },
            'Trending': {
                screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                navigationOptions: {
                    title: '趋势',
                },
            },
        }, {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    height: 50,
                    backgroundColor: '#678', // tabBar 背景色
                },
                indicatorStyle: styles.indicatorStyle,// 指示器的标签样式
                labelStyle: styles.labelStyle,
            },
        }));
        const isIOS = Platform.OS === 'ios';
        return <View style={{flex: 1, marginTop: isIOS ? 30 : 0}}>
            {navigationBar}
            <TobNavigator/>
        </View>;
    }
}

class FavoriteTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount() {
        this.loadData(true);
        // EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
        //     if (data.to === 2) {
        //         this.loadData(false);
        //     }
        // });
    }

    // componentWillUnmount() {
    //     EventBus.getInstance().removeListener(this.listener);
    // }

    loadData(isShowLoading) {
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName, isShowLoading);
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
            };
        }
        return store;
    }

    onFavorite(item, sFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, sFavorite, this.props.flag);
        // if (this.storeName === FLAG_STORAGE.flag_popular) {
        //     EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
        // } else {
        //     EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
        // }
    }


    renderItem(data) {
        const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
        return <Item
            projectModel={item}
            onSelect={(callback) => {
                NavigationUtil.goPage({
                    projectModel: item,
                    flag: this.storeName,
                    callback,
                }, 'DetailPage');
            }}
            onFavorite={(item, sFavorite) => this.onFavorite(item, sFavorite)}
        />;
    }

    render() {
        let store = this._store();

        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + (item.item.id || item.item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={THEME_COLOR}
                        />
                    }
                />
                <Toast ref={'toast'}
                       position={'center'}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    favorite: state.favorite,
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
});
//注意：connect只是个function，并不应定非要放在export后面
const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
});
