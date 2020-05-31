import { FetchOptionsEnum } from './fetchApiModels';
import { RootReducerActions } from './storeActionBaseTypings';

export interface ApiFetchBackgroundMessage {
    request: FetchOptionsEnum;
    filter: string;
    dispatchActionType?: RootReducerActions['type'];
}
