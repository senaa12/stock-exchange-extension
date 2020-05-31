import { RootReducerActions } from 'common';

declare module 'redux' {
    export interface StoreAction<P extends {}, T extends keyof P> {
        type: T;
        payload: P[T];
    }

}
