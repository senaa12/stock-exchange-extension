import classNames from 'classnames';
import { RootReducerState, Stock } from 'common';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { removeStockFromFavorites } from '../../actions/appActions';
import Icon from '../../components/icon/icon';
import { IconEnum } from '../../components/icon/iconEnum';
import CustomCombobox from '../customCombobox/customCombobox';

import './settingsScreen.scss';

export interface SettingsScreenStateProps {
    favoriteStocks: Array<Stock>;
}

export interface SettingsScreenDispatchProps {
    removeStockFromFavorites:(stock: Stock) => void;
}

export declare type SettingsScreenProps = SettingsScreenDispatchProps & SettingsScreenStateProps;

const mapStateToProps = (state: RootReducerState): SettingsScreenStateProps => {
    const filtered = state.appReducer.stocks?.filter(s => state.appReducer.favoriteStocks.findIndex(favStock => favStock === s.symbol) > -1);
    return {
        favoriteStocks: filtered ?? []
    };
};

const mapDispatchToProps = (dispatch: Dispatch): SettingsScreenDispatchProps => {
    return {
        removeStockFromFavorites: (stock: Stock) => dispatch(removeStockFromFavorites(stock))
    };
};

const settingsScreen: React.FunctionComponent<SettingsScreenProps> = props => {
    const removeFromFavorites = useCallback((stock: Stock) => () => props.removeStockFromFavorites(stock), []);

    const renderFavoriteStock = (stock: Stock, index: number) => {
        const className = classNames('custom-combobox-result__item', {
            'border-top': !!index,
            'first': !index,
            'last': index === props.favoriteStocks.length - 1
        });

        return (
            <div className={className} data-testid={stock.symbol}>
                <div>
                    <span className={'symbol'}>{stock.symbol}</span>
                    <span className={'name'}>{' '}({stock.description})</span></div>
                <div className={'remove-button'}>
                    <Icon iconName={IconEnum.Close} onClick={removeFromFavorites(stock)} />
                </div>
            </div>
        );
    };

    const classname = classNames('favorite-stocks__content__list', 'scrollbar', {
        'no-data': !props.favoriteStocks.length
    });
    return (
        <div className={'favorite-stocks'}>
            <div className={'favorite-stocks__description'}>
                {'SELECT YOUR FAVORITE STOCKS'}
            </div>
            <div className={'favorite-stocks__content'}>
                <CustomCombobox />
                <div className={classname}>
                    {props.favoriteStocks.length ? props.favoriteStocks.map(renderFavoriteStock) : 'No data'}
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen);
