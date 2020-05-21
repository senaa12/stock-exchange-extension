import { FetchOptionsEnum } from './utils';

export enum AppDispatchActionEnum {

}

export type AppActionEnum = FetchOptionsEnum;

export declare type ActionType = AppActionEnum;

export interface Action<T> {
    type: T;
    data: any;
}
