import classNames from 'classnames';
import { News, RootReducerState } from 'common';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import useNews from '../../assets/useNewsHook';
import Icon from '../../components/icon/icon';
import { IconEnum, IconSize } from '../../components/icon/iconEnum';
import LoadingComponent from '../../components/loadingComponent/loadingComponent';

import './newsScreen.scss';

export interface NewsScreenStateProps {
    favoriteStockId: Array<string>;
}

export declare type NewsScreenProps = NewsScreenStateProps;

const mapStateToProps = (state: RootReducerState): NewsScreenStateProps => {
    return {
        favoriteStockId: state.appReducer.favoriteStocks
    };
};

const newsScreen: React.FunctionComponent<NewsScreenProps> = props => {
    const news = useNews(props.favoriteStockId);

    const renderNewsTile = (data: News, index: number) => {
        const openInNewTab = () => window.open(data.url, '__blank');

        const newsTileClassName = classNames('news-tile-small', {
            'first': !index,
            'last': index === news?.length! - 1
        });
        return (
            <div className={newsTileClassName}>
                <div className={'news-tile-small__content'}>
                    <div className={'title'}>{data.headline}</div>
                    <div className={'footer'}>
                        <div className={'related'} title={data.related}>{'Related: '}<br />{data.related}</div>
                        <div className={'date'}>{moment.unix(data.datetime!).format('ddd - LT')}</div>
                    </div>
                </div>
                <div className={'news-tile-small__open'}>
                    <Icon onClick={openInNewTab} iconName={IconEnum.Share} iconSize={IconSize.Smallest} />
                </div>
            </div>
        );
    };

    const className = classNames('news-screen');
    return (
        <div className={className}>
            <div className={'screen-title'}>{'NEWS RELATED TO YOUR FAVORITE STOCKS'}</div>
            <div className={'news-screen__content scrollbar'}>
            {!news ?
                <LoadingComponent /> :
                news.length ? news.map(renderNewsTile) : 'No news'
            }
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(newsScreen);
