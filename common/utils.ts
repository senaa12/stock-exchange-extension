export type CallbackFunction<T> = (data?: T) => void;

export type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export const isObjectEmpty = (obj: object) => !Object.keys(obj).length;

/**
 * arrays are same if they contain same elements (this probbably wont work on array of objects)
 * @param arr1
 * @param arr2
 */
export const areArraysEqual = (arr1: Array<any>, arr2: Array<any>) => {
    if(arr1.length !== arr2.length) {
        return false;
    }

    const arr1Sorted = arr1.sort();
    const arr2Sorted = arr2.sort();

    arr1.forEach((v, index) => {
        if(v !== arr2[index]) {
            return false;
        }
    });
    return true;
};
