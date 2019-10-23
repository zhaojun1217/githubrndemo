import {combineReducers} from 'redux';
import theme from './theme';
import {rootCom, RootNavigator} from '../navigator/AppNavigator';
import {createAppContainer} from 'react-navigation';

// const rootCom = 'Init';//设置根路由
// RootNavigator.router.getActionForPathAndParams(rootCom)：是获取路由rootCom对应的action
// const navState = RootNavigator.router.getStateForAction()：是获取该action的state；
// 整个代码可拆分为：
// const rootCom = 'Init';//设置根路由
// //获取rootCom对于的action
// const action=RootNavigator.router.getActionForPathAndParams(rootCom);
// //根据action获取state
// const navState = RootNavigator.router.getStateForAction(action);
// 这步是固定的写法，不需要死记硬背，在将redux与react-navigation结合的时候知道需要这样做就好。


//1.指定默认state
console.log(RootNavigator.router.getStateForAction);
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
});

export default index;
