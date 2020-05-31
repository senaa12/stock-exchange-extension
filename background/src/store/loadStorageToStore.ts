import { AppActionEnum, FetchOptionsEnum,  getStorageLocal, RootReducerActions, RootReducerState } from 'common';
import { Dispatch } from 'redux';
import fetcher from '../apiFetcher';

/**
 * load data from storage to Redux store
 * @param storageKey
 * @param dispatchType
 * @param fetchType
 * @param filter
 */
export function loadStorageToStore<T extends RootReducerActions['payload']>(storageKey: string, dispatchType: RootReducerActions['type'], fetchType?: FetchOptionsEnum, filter?: string){
    return async(dispatch: Dispatch<RootReducerActions>, getState:() => RootReducerState) => {
        const createAction = (actionType: RootReducerActions['type'], resultData: any): RootReducerActions | void => {
            switch(actionType) {
                case AppActionEnum.GetWallStreetStocks: {
                    return {
                        type: AppActionEnum.GetWallStreetStocks,
                        payload: {
                            fetchedData: resultData
                        }
                    };
                }
                case AppActionEnum.UpdateFavoriteStocks: {
                    return {
                        type: AppActionEnum.UpdateFavoriteStocks,
                        payload: resultData
                    };
                }
                default: {
                    throw new Error('You need to define action creator for loadStorageToStore function');
                }
            }
        };

        const data = await getStorageLocal<T>(storageKey);
        if(data) {
            dispatch(createAction(dispatchType, data.data) as RootReducerActions);
            return;
        }

        if(fetchType) {
            const fetched = await fetcher.apiFetch(fetchType, filter, dispatchType);
        }
    };
}
