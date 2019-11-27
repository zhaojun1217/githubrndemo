import Types from '../../action/types';

const defaultState = {};
/**
 * popular :{
 *     java :{
 *         items:[],
 *         isloading : false
 *     },
 *     ios :{
 *         items:[],
 *         isloading : false
 *     },
 * }
 * 0.state树 横向扩展
 * 1。如何动态设置store，和动态获取store （难点 ： storeKey不固定）
 * @param state
 * @param action
 * @returns {{theme: *}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS: // 下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, // 原始数据
                    projectModels: action.projectModels, // 此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.POPULAR_REFRESH: // 下拉刷新的时候
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            };
        case Types.POPULAR_REFRESH_FAIL: // 下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                },
            };
        case Types.LOAD_POPULAR_MORE_SUCCESS: // 上拉刷新成功
            return {
                ...state, // Object.assign 也可以
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.LOAD_POPULAR_MORE_FAIL: // 上拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            };
        case Types.FLUSH_POPULAR_FAVORITE: // 刷新收藏状态
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                },
            };
        default:
            return state;
    }

}
