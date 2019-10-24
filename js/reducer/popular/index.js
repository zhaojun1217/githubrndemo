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
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false,
                },
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true,
                },
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                },
            };
        default:
            return state;
    }

}
