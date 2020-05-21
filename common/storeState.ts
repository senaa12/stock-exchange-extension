import { Stock } from './stockApiModels';

export interface AppReducerState {
    stocks?: Array<Stock>;
}

export interface RootReducerState {
    appReducer: AppReducerState;
}
