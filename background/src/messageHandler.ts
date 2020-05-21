import { BackgroundMessageTypeEnum, CallbackFunction, ChromeApiMessage, MessageSender } from 'common';

export default (
    request: ChromeApiMessage<BackgroundMessageTypeEnum>,
    sender: MessageSender,
    sendResponse: CallbackFunction<any>
) => {
        switch(request.type) {
            // default: {
            //     const exhaustiveCheck: never = request.type;
            //     return;
            // }
        }
};
