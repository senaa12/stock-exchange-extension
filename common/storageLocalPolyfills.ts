import moment from 'moment';
import { LocalStorageData } from './fetchApiModels';

/**
 * chrome.storage.local.set written without callback
 * @param key
 * @param dataToSave
 */
export const setStorageLocal = (key: string, dataToSave: any): Promise<boolean> => {
    const data = {
        dateString: moment().toString(),
        data: dataToSave
    } as LocalStorageData<typeof dataToSave>;

    return new Promise((resolve, reject) => {
        try{
            chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
                console.log(`Data saved to local storage with key: ${key}`);
                resolve(true);
            });
        }
        catch (ex) {
            reject(ex);
        }

    });
};

/**
 * chrome.storage.local.get written without a promise
 * @param key
 */
export function getStorageLocal<T = any>(key: string): Promise<LocalStorageData<T> | undefined> {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, (items: Record<string, string>) => {
                const data = JSON.parse(items[key] ?? '{}') as LocalStorageData<T>;

                if(!Object.keys(data).length) {
                    console.warn(`Record with key: ${key} does not exist`);
                    resolve(undefined);
                } else {
                    resolve(data);
                }
            });
        }
        catch(ex) {
            reject(ex);
        }
    });
}
