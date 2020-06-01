import { AppActionEnum, AppActionPayloadMapper, AppStateEnum, getStorageLocal, RootReducerActions, RootReducerState, setStorageLocal, Stock } from 'common';
import { Dispatch, StoreAction } from 'redux';

export const changeAppState = (newState: AppStateEnum): StoreAction<AppActionPayloadMapper, AppActionEnum.SetAppState> => ({
    type: AppActionEnum.SetAppState,
    payload: newState
});

export const addStockToFavorites = (stock: Stock): any => (
    async(dispatch: Dispatch<RootReducerActions>, getState: () => RootReducerState) => {
        const currentFavorites = await getStorageLocal<Array<string>>(AppActionEnum.UpdateFavoriteStocks);

        const newFavorites: Array<string> = currentFavorites ? [ ...currentFavorites.data, stock.symbol ] : [ stock.symbol ];

        await setStorageLocal(AppActionEnum.UpdateFavoriteStocks, newFavorites);

        dispatch({
            type: AppActionEnum.UpdateFavoriteStocks,
            payload: newFavorites
        });
});

export const removeStockFromFavorites = (stock: Stock): any => (
    async(dispatch: Dispatch<RootReducerActions>, getState: () => RootReducerState) => {
        const currentFavorites = (await getStorageLocal<Array<string>>(AppActionEnum.UpdateFavoriteStocks))?.data;
        if(!currentFavorites || !currentFavorites.length) {
            return;
        }

        const index = currentFavorites.indexOf(stock.symbol);
        currentFavorites?.splice(index, 1);

        await setStorageLocal(AppActionEnum.UpdateFavoriteStocks, currentFavorites);
        dispatch({
            type: AppActionEnum.UpdateFavoriteStocks,
            payload: currentFavorites
        });
    }
);
