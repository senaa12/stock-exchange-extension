import { AppActionEnum, FetchOptionsEnum } from 'common';
import { wrapStore } from 'webext-redux';
import apiFetcher from './apiFetcher';
import messageHandler from './messageHandler';
import newsLoader from './newsLoader';
import createStore from './store/createStore';
import { loadStorageToStore } from './store/loadStorageToStore';

const isProduction = process.env.PRODUCTION !== undefined ? JSON.parse(process.env.PRODUCTION) : false;

export const store = createStore(isProduction);
export default wrapStore(store);

apiFetcher.registerStore(store);

loadStorageToStore(store, FetchOptionsEnum.GetWallStreetStocks, AppActionEnum.GetWallStreetStocks, FetchOptionsEnum.GetWallStreetStocks);
loadStorageToStore(store, AppActionEnum.UpdateFavoriteStocks, AppActionEnum.UpdateFavoriteStocks).then(() => newsLoader.initialize(store));

chrome.runtime.onMessage.addListener(messageHandler);
