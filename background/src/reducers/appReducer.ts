import { Action, AppActionEnum, AppReducerState, FetchOptionsEnum } from 'common';

export const appReducerInitialState: AppReducerState = {
};

export default (state = appReducerInitialState, action: Action<AppActionEnum>): AppReducerState => {
    switch(action.type) {
        case AppActionEnum.GetWallStreetStocks: {
            return {
                ...state,
                stocks: action.data
            };
        }
        default: {
            const type: never = action.type;
            return state;
        }
    }
};
