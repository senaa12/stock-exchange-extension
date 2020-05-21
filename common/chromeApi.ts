// simplification of chrome types
export declare type MessageSender = chrome.runtime.MessageSender;
export declare type Tab = chrome.tabs.Tab;

// => content-script messaging
export enum ContentScriptMessageTypeEnum {
}

// => bacground messaging
export enum BackgroundMessageTypeEnum {
}

export declare type ChromeApiMessageTypeEnum = ContentScriptMessageTypeEnum | BackgroundMessageTypeEnum;
export interface ChromeApiMessage<T> {
    type: T;
    data?: any;
}
