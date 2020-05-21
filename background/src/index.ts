import { wrapStore } from 'webext-redux';
import messageHandler from './messageHandler';
import createStore from './store/createStore';

const isProduction = process.env.PRODUCTION !== undefined ? JSON.parse(process.env.PRODUCTION) : false;

export const store = createStore(isProduction);
export default wrapStore(store);

chrome.runtime.onMessage.addListener(messageHandler);
