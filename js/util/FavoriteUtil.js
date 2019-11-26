import {FLAG_STORAGE} from '../expand/dao/DataStore';

export default class FavoriteUtil {

    static onFavorite(favoriteDao, item, sFavorite, flag) {
        const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
        if (sFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }

}
