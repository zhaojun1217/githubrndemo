/**
 * 带搜藏状态的model
 * @param item
 * @param isFavorite
 * @constructor
 */
export default function ProjectModel(item, isFavorite) {
    this.item = item;
    this.isFavorite = isFavorite;
}
