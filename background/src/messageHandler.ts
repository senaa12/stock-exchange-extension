import {  BackgroundMessages, BackgroundMessageTypeEnum, CallbackFunction, MessageSender } from 'common';
import apiFetcher from './apiFetcher';
import newsLoader from './newsLoader';

export default (
    request: BackgroundMessages,
    sender: MessageSender,
    sendResponse: CallbackFunction<any>
) => {
        switch(request.type) {
            case BackgroundMessageTypeEnum.ApiFetch: {
                apiFetcher.apiFetch(request.payload.request!, request.payload.filter, request.payload.dispatchActionType).then(sendResponse);

                // return true keeps channel open and waits when sendResponse will be called (async actions)
                return true;
            }
            case BackgroundMessageTypeEnum.RefreshNews: {
                newsLoader.refreshNews().then(sendResponse);
                return true;
            }
            default: {
                const exhaustiveCheck: never = request;
                return;
            }
        }
};
