import { ApiFetchBackgroundMessage } from './chromeApiModels';

// simplification of chrome types
export declare type MessageSender = chrome.runtime.MessageSender;
export declare type Tab = chrome.tabs.Tab;

//#region => content-script messaging
export enum ContentScriptMessageTypeEnum {
}

export type ContentScriptPayloadMapper = {
};

//#endregion

//#region => background page
export enum BackgroundMessageTypeEnum {
    ApiFetch
}

export type BackgroundPayloadMapper = {
    [BackgroundMessageTypeEnum.ApiFetch]: ApiFetchBackgroundMessage;
};

export type BackgroundMessages =
        ChromeApiMessage<BackgroundPayloadMapper, BackgroundMessageTypeEnum.ApiFetch>;

//#endregion => Background page

export interface ChromeApiMessage<P extends {}, T extends keyof P> {
    type: T;
    payload: P[T];
}
