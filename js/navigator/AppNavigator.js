import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import FetchDemoPage from '../page/FetchDemoPage';
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage';
import DataStoreDemoPage from '../page/DataStoreDemoPage';
import AboutPage from '../page/about/AboutPage';
import AboutMePage from '../page/about/AboutMePage'
import SearchPage from '../page/SearchPage';
import CustomKeyPage from '../page/CustomKeyPage';
import SortKeyPage from '../page/SortKeyPage';
import {connect} from 'react-redux';
import {
    createReactNavigationReduxMiddleware,
    createReduxContainer,
} from 'react-navigation-redux-helpers';
import WebViewPage from '../page/WebViewPage';

export const rootCom = 'Init';// 设置跟路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
});
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    FetchDemoPage: {
        screen: FetchDemoPage,
        navigationOptions: {
            // header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    AsyncStorageDemoPage: {
        screen: AsyncStorageDemoPage,
        navigationOptions: {
            // header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    DataStoreDemoPage: {
        screen: DataStoreDemoPage,
        navigationOptions: {
            // header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    SortKeyPage: {
        screen: SortKeyPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
});

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
    },
}));

/**
 * 1。初始化react-navigation与redux的中间件
 * 该方法的一个很大的作用就是为createReduxContainer的key设置actionSubscribers（行为订阅者）
 * 设置订阅者
 * 检测订阅者是否存在
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);

/**
 * 2。将根导航器组建传递给 createReduxContainer汗水
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组建
 * 注意 要在createReactNavigationReduxMinddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * state 到 props的映射关系
 */
const mapStateToProps = state => ({
    state: state.nav,
});

/**
 * 3.链接 react 组件与 redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);
