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

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = `&sort=stars`;
const THEME_COLOR = '#678';

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['java', 'android', 'react', 'react-native', 'php'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage{...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
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
        const TobNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
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
const pageSize = 10; // 设置常量 防止修改
class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onRefreshPopular, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                // 到这里就没有更多了
                this.refs.toast.show('没有更多了');
            });
        } else {
            onRefreshPopular(this.storeName, url, pageSize, favoriteDao);
        }
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            projectModel={item}
            onSelect={() => {
                NavigationUtil.goPage({
                    projectModel: item,
                }, 'DetailPage');
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
        />;
        // return <View style={{marginBottom: 10}}>
        //     <Text style={{backgroundColor: '#456'}}>
        //         {JSON.stringify(item)}
        //     </Text>
        // </View>;
    }

    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true, // 默认隐藏加载更多
            };
        }
        return store;
    }


    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>;
    }


    render() {
        let store = this._store();

        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => {
                                this.loadData();
                            }}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => {
                        return this.genIndicator();
                    }}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                        if (this.canLoadMore) {
                            this.loadData(true);
                            this.canLoadMore = false;
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; // fix 初始化滚动时候页面调用onendreached
                    }}
                />
                <Toast ref={'toast'}
                       position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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
        // minWidth: 50,
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
        // marginTop: 6,
        // marginBottom: 6,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        alignItems: 'center',
    },
});
