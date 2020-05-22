# stock-exchange-extension
Chrome extension for monitoring stock price

Declaring types in ChromeApi messaging structure:

Every chrome api message has structure: 

```
export interface ChromeApiMessage<T extends ChromeApiMessageTypeEnum> {
    type: T;
    data?: ChromeApiMessagePayload<T>;
}
```

where type `ChromeApiMessageTypeEnum` is either `BackgroundMessageTypeEnum` or `ContentScriptMessageTypeEnum`. Payload is determined based on message type. If you want to send payload with message you need to define interface in `BackgroundMessageTypePayload` if message is sent to background page or in `ContentScriptMessageTypePayload` if message is sent to content script. For instance if you are sending message to background page you need to insert this row in `BackgroundMessageTypePayload`: 

```
    T extends BackgroundMessageTypeEnum.YOUR_MESSAGE_TYPE ? I_YOUR_MESSAGE_PAYLOAD :
```

This interface `I_YOUR_MESSAGE_PAYLOAD` should typically be placed in `commonApiModels` file. Now when you insert this row in Payload type declaration messageHandler function will correctly recognize messageType.
