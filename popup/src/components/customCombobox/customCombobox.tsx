import classNames from 'classnames';
import { RootReducerState, Stock } from 'common';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addStockToFavorites } from '../../actions/appActions';
import Icon from '../icon/icon';
import { IconEnum } from '../icon/iconEnum';

import './customCombobox.scss';

export interface CustomComboboxStateProps {
    stocks?: Array<Stock>;
}

export interface CustomComboboxDispatchProps {
    addStockToFavorites: (stock: Stock) => void;
}

declare type CustomComboboxProps = CustomComboboxStateProps & CustomComboboxDispatchProps;

const mapStateToProps = (state: RootReducerState): CustomComboboxStateProps => {
    return {
        stocks: state.appReducer.stocks?.filter(s => !state.appReducer.favoriteStocks.includes(s.symbol))
     };
};

const mapDispatchToProps = (dispatch: Dispatch): CustomComboboxDispatchProps => {
    return {
        addStockToFavorites: (stock: Stock) => dispatch(addStockToFavorites(stock))
    };
};

const customCombobox: React.FunctionComponent<CustomComboboxProps> = (props) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [result, setResult] = useState<Array<Stock>>([]);

    const onChange = (e) => setSearchValue(e.target.value);

    useEffect(() => {
        if(!searchValue || !props.stocks) {
            setResult([]);
            return;
        }
        const filtered = props.stocks.filter(s => s.description.toLowerCase().includes(searchValue?.toLowerCase() ?? '') ||
                    s.symbol.toLowerCase().includes(searchValue?.toLowerCase() ?? ''));
        setResult(filtered);
    }, [searchValue]);

    const onCloseClick = () => setSearchValue('');

    const renderComboboxResult = () => {
        if(result.length) {
            const addStockToFav = (stock: Stock) => () => {
                setSearchValue('');
                props.addStockToFavorites(stock);
            };

            return (
                <div className={'custom-combobox-result'}>
                    {result.map((stock, index) => {
                        const className = classNames('custom-combobox-result__item', {
                            'border-top': !!index,
                            'first': !index,
                            'last': index === result.length - 1
                        });

                        return (
                            <div className={className} onClick={addStockToFav(stock)} data-testid={stock.symbol}>
                                <span className={'symbol'}>{stock.symbol}</span>
                                <span className={'name'}>{' '}({stock.description})</span>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if(!result.length && searchValue.length) {
            return (
                <div className={'custom-combobox-result'} data-testid={'no-data'}>
                    <div className={'custom-combobox-result__item'}>No data</div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <input
                className='custom-combobox'
                type='text'
                onChange={onChange}
                value={searchValue}
                placeholder={'Search stocks'}
            />
            <Icon iconName={IconEnum.Close} className={'input-close'} onClick={onCloseClick} testId={'clear-button'} />
            {renderComboboxResult()}
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(customCombobox);
