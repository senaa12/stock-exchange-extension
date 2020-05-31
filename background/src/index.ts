import { AppActionEnum, FetchOptionsEnum } from 'common';
import { wrapStore } from 'webext-redux';
import apiFetcher from './apiFetcher';
import messageHandler from './messageHandler';
import createStore from './store/createStore';
import { loadStorageToStore } from './store/loadStorageToStore';

const isProduction = process.env.PRODUCTION !== undefined ? JSON.parse(process.env.PRODUCTION) : false;

export const store = createStore(isProduction);
export default wrapStore(store);

apiFetcher.registerStore(store);

store.dispatch(loadStorageToStore(FetchOptionsEnum.GetWallStreetStocks, AppActionEnum.GetWallStreetStocks, FetchOptionsEnum.GetWallStreetStocks) as any);
store.dispatch(loadStorageToStore(AppActionEnum.UpdateFavoriteStocks, AppActionEnum.UpdateFavoriteStocks) as any);

chrome.runtime.onMessage.addListener(messageHandler);
