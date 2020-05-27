# stock-exchange-extension
Chrome extension for monitoring stock prices

## Starting project

To start project you need to get key to access the [finnhub.io](https://finnhub.io/) API. When you get the key, create `.env` file in project root with structure

```
FINNHUB_TOKEN="ENTER YOUR API KEY"
```

Next run `npm install` and `npm run build` to build project.

## Declaring types in ChromeApi messaging structure:

Every chrome api message has structure: 

```
export interface ChromeApiMessage<T extends ChromeApiMessageTypeEnum> {
    type: T;
    data?: ChromeApiMessagePayload<T>;
}
```

where type `ChromeApiMessageTypeEnum` is either `BackgroundMessageTypeEnum` or `ContentScriptMessageTypeEnum`. Payload is determined based on message type. If you want to send payload with message you need to register payload interface in `BackgroundMessageTypePayload` or in `ContentScriptMessageTypePayload` depends where the message is being sent. For instance if you are sending message to background page you need to register payload interface in the `BackgroundMessageTypePayload`: 

```
    T extends BackgroundMessageTypeEnum.YOUR_MESSAGE_TYPE ? I_YOUR_MESSAGE_PAYLOAD :
```

This interface `I_YOUR_MESSAGE_PAYLOAD` should typically be placed in `commonApiModels` file. Now when you registered payload interface; messageHandler function will correctly recognize payload you need to send with the message.
