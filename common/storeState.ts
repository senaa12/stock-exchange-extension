import { Quote, Stock } from './fetchApiModels';

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
