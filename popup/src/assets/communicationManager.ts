import { CallbackFunction, ChromeApiMessage } from 'common';

class CommunicationManager {
    public sendMessageToActiveTab<P extends {}, T extends keyof P>(message: ChromeApiMessage<P, T>, onReponse?: CallbackFunction<any>) {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, message, onReponse);
            }
        });
    }

    public sendMessageToTab<P extends {}, T extends keyof P>(tabID: number, message: ChromeApiMessage<P, T>, onReponse?: CallbackFunction<any>) {
        chrome.tabs.sendMessage(tabID, message, onReponse);
    }

    public sendMessageToBackgroundPage<P extends {}, T extends keyof P>(message: ChromeApiMessage<P, T>, onReponse?: CallbackFunction<any>) {
        chrome.runtime.sendMessage(message, onReponse);
    }
}

const communicationManager = new CommunicationManager();
export default communicationManager;
