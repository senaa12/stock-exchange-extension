import { News } from 'common';
import moment from 'moment';
import React from 'react';
import Icon from '../../components/icon/icon';
import { IconEnum } from '../../components/icon/iconEnum';
import LoadingComponent from '../../components/loadingComponent/loadingComponent';

import './newsTile.scss';

export interface NewsTileProps {
    data?: News;
}

const newsTile: React.FunctionComponent<NewsTileProps> = props => {
    const renderContent = () => {
        const openInNewTab = () => window.open(props.data?.url, '__blank');

        return (
            <>
                <img src={props.data?.image} className={'news-tile__image'} />
                <div className={'news-tile__content'}>
                    <div className={'news-tile__content__title'}>{props.data?.headline}</div>
                    <div className={'news-tile__content__summary'}>{props.data?.summary}</div>
                    <div className={'news-tile__content__footer'}>
                        <div className={'related'}>{'Related: '}<br />{props.data?.related}</div>
                        <div className={'date'}>{moment.unix(props.data?.datetime!).format('ddd MMM Do - LT')}</div>
                    </div>
                    <div className={'news-tile__content__open-in-tab'}>
                        <div className={'open'} onClick={openInNewTab} title={props.data?.url}>
                            Open in new tab<Icon iconName={IconEnum.Share} />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className={'news-tile'}>
            {!!props.data ? renderContent() : <LoadingComponent />}
        </div>
    );
};

export default newsTile;
