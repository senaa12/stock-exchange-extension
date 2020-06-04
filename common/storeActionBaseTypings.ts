import { StoreAction } from 'redux';
import { FetchReduxActionResult, Quote, Stock } from './fetchApiModels';

//#region AppReducer actions
export enum AppActionEnum {
    GetWallStreetStocks = '@App-GET_ALL_STOCKS',
    UpdateFavoriteStocks = '@App-UPDATE_FAVORITE_STOCKS',
}

export interface AppActionPayloadMapper {
    [AppActionEnum.GetWallStreetStocks]: FetchReduxActionResult<Array<Stock>>;
    [AppActionEnum.UpdateFavoriteStocks]: Array<string>;
}

export type AppReducerActions =
    StoreAction<AppActionPayloadMapper, AppActionEnum.GetWallStreetStocks> |
    StoreAction<AppActionPayloadMapper, AppActionEnum.UpdateFavoriteStocks>;

//#endregion

//#region
export enum QuoteActionEnum {
    SetQuoteForStock = '@Quote-SET_QUOTE_FOR_STOCK'
}

export type QuoteReducerPayloadMapper = {
    [QuoteActionEnum.SetQuoteForStock]: FetchReduxActionResult<Quote>;
};

export type QuoteReducerActions =
    StoreAction<QuoteReducerPayloadMapper, QuoteActionEnum.SetQuoteForStock>;

//#endregion

export type RootReducerActions =
    AppReducerActions |
    QuoteReducerActions;


