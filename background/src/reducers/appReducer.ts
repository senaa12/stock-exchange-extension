import { AppActionEnum, AppReducerActions, AppReducerState, AppStateEnum } from 'common';

export const appReducerInitialState: AppReducerState = {
    favoriteStocks: [],
    appState: AppStateEnum.NewsScreen
};

export default (state = appReducerInitialState, action: AppReducerActions): AppReducerState => {
    switch(action.type) {
        case AppActionEnum.GetWallStreetStocks: {
            return {
                ...state,
                stocks: action.payload.fetchedData
            };
        }
        case AppActionEnum.UpdateFavoriteStocks: {
            return {
                ...state,
                favoriteStocks: action.payload
            };
        }
        case AppActionEnum.SetAppState: {
            return {
                ...state,
                appState: action.payload
            };
        }
        default: {
            const type: never = action;
            return state;
        }
    }
};
