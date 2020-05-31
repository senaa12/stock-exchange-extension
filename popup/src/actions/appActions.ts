import { AppActionEnum, getStorageLocal, RootReducerActions, RootReducerState, setStorageLocal, Stock } from 'common';
import { Dispatch } from 'redux';

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

    }
);
