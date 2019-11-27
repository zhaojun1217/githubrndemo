import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
import {_projectModels, handleData} from '../ActionUtil';

/**
 * 加载更多
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => { //  模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已经加载完毕 全部数据
                if (typeof callBack === 'function') {
                    callBack('no more');
                }
                dispatch({
                    type: Types.LOAD_POPULAR_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                });
            } else {
                //  本次和载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, data => {
                    dispatch({
                        type: Types.LOAD_POPULAR_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: data,
                    });
                });

            }
        }, 500);
    };
}

/**
 * 获取最热数据的一步action
 * @param theme
 * @returns {{theme: *, type: *}}
 */
export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url) // 异步action与数据流
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error,
                });
            });
    };
}

/**
 * 刷新收藏状态
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onFlushPopularFavorite(storeName, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch=>{
        //本次和载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max),favoriteDao,data=>{
            dispatch({
                type: Types.FLUSH_POPULAR_FAVORITE,
                storeName,
                pageIndex,
                projectModels: data,
            })
        })
    }
}

