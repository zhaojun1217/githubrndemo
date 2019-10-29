import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
import {handleData} from '../ActionUtil';

/**
 * 加载更多
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
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
                    projectModes: dataArray,
                });
            } else {
                //  本次和载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.LOAD_POPULAR_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max),
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
export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url) // 异步action与数据流
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch, storeName, data, pageSize);
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

