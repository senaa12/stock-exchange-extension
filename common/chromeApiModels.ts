import { FetchOptionsEnum } from './fetchApiModels';
import { ActionType } from './storeAction';

export interface ApiFetchBackgroundMessage {
    request: FetchOptionsEnum;
    filter: string;
    dispatchActionType?: ActionType;
}
