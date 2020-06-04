import { AppActionEnum, AppReducerActions, AppReducerState } from 'common';

export const appReducerInitialState: AppReducerState = {
    favoriteStocks: [],
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
        default: {
            const type: never = action;
            return state;
        }
    }
};
