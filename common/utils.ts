export type CallbackFunction<T> = (data?: T) => void;

export type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export enum FetchOptionsEnum {
    GetWallStreetStocks = '@FETCH/GET_WALL_STREET_STOCKS'
}

