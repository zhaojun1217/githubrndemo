import Types from '../types';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
import LanguageDao from '../../expand/dao/LanguageDao';

/**
 * 加载收藏的项目
 * @param flagKey 标识
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey});
        } catch (e) {
            console.log(e);
        }
    };
}



