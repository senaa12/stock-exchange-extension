import { AppStateEnum, RootReducerState } from 'common';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FavoriteStocks from '../favoriteStocks/favoriteStocks';
import NewsScreen from '../newsScreen/newsScreen';

export interface AppContentStateProps {
    appState: AppStateEnum;
}

export declare type AppContentProps = AppContentStateProps;


const mapStateToProps = (state: RootReducerState): AppContentStateProps => {
    return {
        appState: state.appReducer.appState
    };
};

const appContent: React.FunctionComponent<AppContentProps> = props => {
    const renderAppContent = () => {
        switch(props.appState) {
            case AppStateEnum.SelectFavorites: {
                return <FavoriteStocks />;
            }
            case AppStateEnum.Settings: {
                return <div>settings</div>;
            }
            default: {
                return <NewsScreen />;
            }
        }
    };
    return (
        <div className={'app-content'}>
            {renderAppContent()}
        </div>
    );
};

export default connect(mapStateToProps)(appContent);
