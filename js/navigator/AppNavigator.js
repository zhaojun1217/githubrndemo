import {createSwitchNavigator} from 'react-navigation'
import WelcomePage from '../page/WelcomePage';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';


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
            // header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
        },
    },
});

export default createSwitchNavigator({
    Init : InitNavigator,
    Main : MainNavigator,
},{
    navigationOptions: {
        header: null,// 可以通过将header null 来金庸stacknavigator的navigatorbar
    },
})
