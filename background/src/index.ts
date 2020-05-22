import { AppActionEnum, FetchOptionsEnum } from 'common';
import moment from 'moment';
import { wrapStore } from 'webext-redux';
import apiFetcher from './apiFetcher';
import messageHandler from './messageHandler';
import createStore from './store/createStore';

const isProduction = process.env.PRODUCTION !== undefined ? JSON.parse(process.env.PRODUCTION) : false;

export const store = createStore(isProduction);
export default wrapStore(store);

apiFetcher.registerStore(store);
apiFetcher.loadFromStorageOrFetch(FetchOptionsEnum.GetWallStreetStocks, moment().add(-3, 'days'), AppActionEnum.GetWallStreetStocks);

chrome.runtime.onMessage.addListener(messageHandler);

