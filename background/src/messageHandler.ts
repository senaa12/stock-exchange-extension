import { BackgroundMessageTypeEnum, CallbackFunction, ChromeApiMessage, MessageSender } from 'common';
import apiFetcher from './apiFetcher';

export default (
    request: ChromeApiMessage<BackgroundMessageTypeEnum>,
    sender: MessageSender,
    sendResponse: CallbackFunction<any>
) => {
        switch(request.type) {
            case BackgroundMessageTypeEnum.ApiFetch: {
                apiFetcher.apiFetch(request.data.request!, request.data.filter, request.data.dispatchActionType).then(sendResponse);

                // return true keeps channel open and waits when sendResponse will be called (async actions)
                return true;
            }
            default: {
                const exhaustiveCheck: never = request.type;
                return;
            }
        }
};
