import { createSelector } from 'reselect';
import { Quote, Stock } from './fetchApiModels';

//#region store -> state
export interface QuoteReducerState {
    [ticker: string]: Quote;
}

export interface AppReducerState {
    stocks?: Array<Stock>;
    favoriteStocks: Array<string>;
}

export interface RootReducerState {
    appReducer: AppReducerState;
    quoteReducer: QuoteReducerState;
}
//#endregion

//#region state -> selectors
export const getFavoriteStocksSelector = createSelector((state: RootReducerState) => state.appReducer.favoriteStocks, item => item);
//#endregion
