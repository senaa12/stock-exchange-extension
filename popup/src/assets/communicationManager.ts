import { CallbackFunction, ChromeApiMessage, ChromeApiMessageTypeEnum } from 'common';

class CommunicationManager {
    public sendMessageToActiveTab<T extends ChromeApiMessageTypeEnum>(message: ChromeApiMessage<T>, onReponse?: CallbackFunction<any>) {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, message, onReponse);
            }
        });
    }

    public sendMessageToTab<T extends ChromeApiMessageTypeEnum>(tabID: number, message: ChromeApiMessage<T>, onReponse?: CallbackFunction<any>) {
        chrome.tabs.sendMessage(tabID, message, onReponse);
    }

    public sendMessageToBackgroundPage<T extends ChromeApiMessageTypeEnum>(message: ChromeApiMessage<T>, onReponse?: CallbackFunction<any>) {
        chrome.runtime.sendMessage(message, onReponse);
    }
}

const communicationManager = new CommunicationManager();
export default communicationManager;
