import { Stock } from './fetchApiModels';

export interface AppReducerState {
    stocks?: Array<Stock>;
}

export interface RootReducerState {
    appReducer: AppReducerState;
}
