export default class Utils {
    /**
     * 检查该item是否被搜藏
     */
    static checkFavorite(item, keys = []) {
        if (!keys) {
            return false;
        }
        for (let i = 0, len = keys.length; i < len; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查key是否存在于keys中
     */
    static checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
}
