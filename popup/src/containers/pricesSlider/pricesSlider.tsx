import { getFavoriteStocksSelector, RootReducerState } from 'common';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from '../../components/slider/slider';
import PriceTile from '../priceTile/priceTile';

import './pricesSlider.scss';

export interface PricesSliderProps {
    favoriteStocks: Array<string>;
}

const mapStateToProps = (state: RootReducerState): PricesSliderProps => {
    return {
        favoriteStocks: getFavoriteStocksSelector(state)
     };
};

const pricesSlider: React.FunctionComponent<PricesSliderProps> = props => {
    const [ innerFilter, setInnerFilter ] = useState(props.favoriteStocks);
    useEffect(() => {
        if(JSON.stringify(innerFilter) !== JSON.stringify(props.favoriteStocks)) {
            setInnerFilter(props.favoriteStocks);
        }
    }, [props.favoriteStocks]);

    const childRenderer = (key: string, style: React.CSSProperties) => (
        <PriceTile stockId={key} style={style} key={key} />
    );

    return (
        <>
            {innerFilter.length ?
                <Slider
                    childrenKeys={innerFilter}
                    childRenderer={childRenderer}
                    slideDuration={6}
                    childWidth={200}
                /> :
                <div className={'no-data'}>No data</div>
            }
        </>
    );
};

export default connect(mapStateToProps)(pricesSlider);
