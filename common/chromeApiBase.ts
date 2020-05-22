import { ApiFetchBackgroundMessage } from './chromeApiModels';

// simplification of chrome types
export declare type MessageSender = chrome.runtime.MessageSender;
export declare type Tab = chrome.tabs.Tab;

// => content-script messaging
export enum ContentScriptMessageTypeEnum {
}

// => bacground messaging
export enum BackgroundMessageTypeEnum {
    ApiFetch
}

// background messaging payloads
export type BackgroundMessageTypePayload<T extends BackgroundMessageTypeEnum> =
    T extends BackgroundMessageTypeEnum.ApiFetch ? ApiFetchBackgroundMessage :
    undefined;

// content-script messaging payloads
export type ContentScriptMessageTypePayload<T extends ContentScriptMessageTypeEnum> =
    undefined;

export declare type ChromeApiMessagePayload<T extends BackgroundMessageTypeEnum | ContentScriptMessageTypeEnum> =
    T extends BackgroundMessageTypeEnum ? BackgroundMessageTypePayload<T> :
    T extends ContentScriptMessageTypeEnum ? ContentScriptMessageTypePayload<T> :
    undefined;

export declare type ChromeApiMessageTypeEnum = ContentScriptMessageTypeEnum | BackgroundMessageTypeEnum;

export interface ChromeApiMessage<T extends ChromeApiMessageTypeEnum> {
    type: T;
    data: ChromeApiMessagePayload<T>;
}
