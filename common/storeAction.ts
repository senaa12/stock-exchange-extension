export enum QuoteActionEnum {
    SetQouteForStock = '@Quote-SET_QUOTE_FOR_STORK'
}

export enum AppActionEnum {
    GetWallStreetStocks = '@App-GET_ALL_STOCKS'
}

export declare type ActionType = AppActionEnum | QuoteActionEnum;

export interface Action<T> {
    type: T;
    data: any;
}
