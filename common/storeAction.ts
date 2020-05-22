export enum AppActionEnum {
    GetWallStreetStocks = '@App-GET_ALL_STOCKS'
}

export declare type ActionType = AppActionEnum;

export interface Action<T> {
    type: T;
    data: any;
}
