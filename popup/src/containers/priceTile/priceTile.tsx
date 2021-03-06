import classNames from 'classnames';
import { BackgroundMessageTypeEnum, BackgroundPayloadMapper, FetchOptionsEnum, Quote, QuoteActionEnum, RootReducerState } from 'common';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import communicationManager from '../../assets/communicationManager';
import useCompanyProfile from '../../assets/useCompanyProfileHook';
import Icon from '../../components/icon/icon';
import { IconEnum, IconSize } from '../../components/icon/iconEnum';
import LoadingComponent from '../../components/loadingComponent/loadingComponent';

import './priceTile.scss';

export interface PriceTileOwnProps {
    stockId: string;
    className?: string;
    style?: React.CSSProperties;
}

export interface PriceTileStateProps {
    quota?: Quote;
}

export declare type PriceTileProps = PriceTileOwnProps & PriceTileStateProps;

const mapStateToProps = (state: RootReducerState, ownProps: PriceTileOwnProps): PriceTileStateProps => {
    const quota = state.quoteReducer && state.quoteReducer[ownProps.stockId];

    return { quota };
};

const PriceTile: React.FunctionComponent<PriceTileProps> = props => {
    const companyProfile = useCompanyProfile(props.stockId);

    useEffect(() => {
        const fetchNewRates = () => {
            communicationManager.sendMessageToBackgroundPage<BackgroundPayloadMapper, BackgroundMessageTypeEnum.ApiFetch>({
                type: BackgroundMessageTypeEnum.ApiFetch,
                payload: { request: FetchOptionsEnum.GetQuotaForStock, filter: props.stockId, dispatchActionType: QuoteActionEnum.SetQuoteForStock }
            });
        };
        fetchNewRates();

        // fetch new rates every 20 seconds
        const tenSeconds = 20000;
        const fetchInterval = setInterval(fetchNewRates, tenSeconds);

        return () => clearInterval(fetchInterval);
    }, []);

    const renderContent = () => {
        const { quota } = props;

        const getPercentageString = () => (`${(Math.round(((props.quota?.c! - props.quota?.pc!) / props.quota?.pc!) * 10000) / 100).toString()}%`);
        const trendingClassName = (base: string) => classNames(base, {
            'rising': (props.quota?.c ?? 0) - (props.quota?.pc ?? 0) > 0,
            'falling': (props.quota?.c ?? 0) - (props.quota?.pc ?? 0) < 0
        });

        return (
            <>
                <div className={'current-price__info'}>
                    <span className={'current-price__info__name'} title={companyProfile?.name}>{props.stockId}</span>
                    <span className={'current-price__info__price'}>{quota?.c}</span>
                </div>
                <div className={'current-price__value'}>
                    <Icon iconName={IconEnum.UpArrow} iconSize={IconSize.Smallest} className={trendingClassName('current-price__value__arrow')}/>
                    <span className={trendingClassName('current-price__value__percent')}>
                        <span className={'percent'}>{getPercentageString()}</span>
                        <span className={'number'}>({(props.quota?.c! - props.quota?.pc!).toFixed(3)})</span>
                    </span>
                </div>
            </>
        );
    };

    const className = classNames('current-price', props.className);
    return (
        <div className={className} style={props.style}>
            {(companyProfile && props.quota) ? renderContent() :  <LoadingComponent />}
        </div>
    );
};

export default connect(mapStateToProps)(PriceTile);
