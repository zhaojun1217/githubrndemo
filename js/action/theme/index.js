import Types from '../types';
import ThemeDao from '../../expand/dao/ThemeDao';

/**
 * 主题变更
 * @param theme
 * @returns {{theme: *, type: *}}
 */
export function onThemeChange(theme) {
    return {type: Types.THEME_CHANGE, theme: theme};
}

/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
    return dispatch => {
        new ThemeDao().getTheme().then((data) => {
            dispatch(onThemeChange(data));
        });
    };
}

/**
 * 显示自定义浮层
 * @param show
 * @returns {{customThemeViewVisible: *, type: *}}
 */
export function onShowCustomThemeView(show) {
    return {type: Types.SHOW_THEME_VIEW, customThemeViewVisible: show};
}
