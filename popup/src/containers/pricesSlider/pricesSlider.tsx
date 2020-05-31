import { RootReducerState } from 'common';
import React from 'react';
import { connect } from 'react-redux';
import Slider from '../../components/slider/slider';
import PriceTile from '../priceTile/priceTile';

import './pricesSlider.scss';

export interface PricesSliderProps {
    favoriteStocks: Array<string>;
}

const mapStateToProps = (state: RootReducerState): PricesSliderProps => {
    return {
        favoriteStocks: state.appReducer.favoriteStocks
     };
};

const pricesSlider: React.FunctionComponent<PricesSliderProps> = props => {
    const childRenderer = (key: string, style: React.CSSProperties) => (
        <PriceTile stockId={key} style={style} key={key} />
    );

    return (
        <>
            {props.favoriteStocks.length ?
                <Slider
                    childrenKeys={props.favoriteStocks}
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
