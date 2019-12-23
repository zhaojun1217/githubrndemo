import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

export default class BaseItem extends Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            sFavorite: this.props.projectModel.sFavorite,
        };
    }


    /**
     * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
     * componentWillReceiveProps在新版React中不能再用了
     * @param nextProps
     * @param prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const sFavorite = nextProps.projectModel.sFavorite;
        if (prevState.sFavorite !== sFavorite) {
            return {
                sFavorite: sFavorite,
            };
        }
        return null;
    }

    setFavoriteState(sFavorite) {
        this.props.projectModel.sFavorite = sFavorite;
        this.setState({
            sFavorite: sFavorite,
        });
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.sFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.sFavorite);
    }

    _favoriteIcon() {
        const {theme} = this.props;
        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor='transparent'
            onPress={() => this.onPressFavorite()}>
            <FontAwesome
                name={this.state.sFavorite ? 'star' : 'star-o'}
                size={26}
                style={{color: theme.themeColor}}
            />
        </TouchableOpacity>;
    }

    onItemClick() {
        this.props.onSelect(sFavorite => {
            this.setFavoriteState(sFavorite);
        });
    }

}
