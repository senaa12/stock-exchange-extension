import { AppActionEnum, FetchOptionsEnum,  getStorageLocal, isObjectEmpty, RootReducerActions, RootReducerState, setStorageLocal } from 'common';
import { Store } from 'redux';
import fetcher from '../apiFetcher';

/**
 * load data from storage to Redux store
 * @param store store object
 * @param storageKey key to save and load data from storage.local
 * @param dispatchType action type to dispatch action when loaded
 * @param fetchType if data needs to be fetch, fetch type option
 * @param filter filter fetch options
 */
export async function loadStorageToStore<T extends RootReducerActions['payload']>(
    store: Store<RootReducerState, RootReducerActions>,
    storageKey: string,
    dispatchType: RootReducerActions['type'],
    fetchType?: FetchOptionsEnum, filter?: string
){
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
    if(data && !isObjectEmpty(data)) {
        store.dispatch(createAction(dispatchType, data.data) as RootReducerActions);
        return Promise.resolve(data);
    }

    if(fetchType) {
        const fetched = await fetcher.apiFetch<T>(fetchType, filter, dispatchType);
        if(fetched) {
            await setStorageLocal(storageKey, fetched);
        }
        return Promise.resolve(fetched);
    }
}
