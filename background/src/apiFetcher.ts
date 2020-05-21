import { FetchOptionsEnum, LocalStorageData, RootReducerState } from 'common';
import moment from 'moment';
import { Store } from 'redux';

export const endpoints: Record<FetchOptionsEnum, string> = {
    [FetchOptionsEnum.GetWallStreetStocks]: '/stock/symbol?exchange=US'
};

class ApiFetcher {
    private endpointBase: string = 'https://finnhub.io/api/v1';
    private getEndpoint(requestType: FetchOptionsEnum) {
        return `${this.endpointBase}${endpoints[requestType]}&token=${process.env.FINNHUB_TOKEN}`;
    }

    // must call at the beginning
    private store: Store<RootReducerState>;
    public registerStore(storeToRegister: Store<RootReducerState>) {
        this.store = storeToRegister;
    }

    /**
     * makes api request to https://finnhub.io/ API and dispatches action to store
     * and if saveInLocalStorage flag is true, saves result to storage.local
     * @param request
     * @param saveInLocalStorage
     */
    public async apiFetch<T>(request: FetchOptionsEnum, saveInLocalStorage?: boolean): Promise<T | undefined> {
        const url: string = this.getEndpoint(request);

        try {
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json();

                this.store.dispatch({
                    type: request,
                    data
                });

                if(saveInLocalStorage) {
                    const modelToSave: LocalStorageData = {
                        dateString: moment().toString(),
                        result: data
                    };

                    chrome.storage.local.set({ [request]: JSON.stringify(modelToSave) }, () => {
                        // tslint:disable-next-line: no-console
                        console.log(`Saved to local storage request type ${request}`);
                    });
                }

                return Promise.resolve(data as T);
            } else {
                // tslint:disable-next-line: no-console
                console.error(response);
                return Promise.reject(undefined);
            }

        } catch(ex) {
            // tslint:disable-next-line: no-console
            console.error(ex);
            return Promise.reject(undefined);
        }
    }

    /**
     * tries to load data to redux store from storage.local,
     * if data does not exist or is older than @param refreshIfOlderThan than fetches it and saves to redux store
     * @param fetchType
     * @param refreshIfOlderThan
     */
    public loadFromStorageOrFetch(fetchType: FetchOptionsEnum, refreshIfOlderThan?: moment.Moment) {
        chrome.storage.local.get(fetchType, (items: Record<FetchOptionsEnum, any>) => {
            const data = JSON.parse(items[fetchType] ?? '{}') as LocalStorageData;

            if(!Object.keys(data).length || (refreshIfOlderThan ? moment(data.dateString) < refreshIfOlderThan : true)) {
                this.apiFetch(fetchType, true);
            } else {
                this.store.dispatch({
                    type: fetchType,
                    data: data.result
                });
            }
        });
    }
}

const fetcher = new ApiFetcher();

export default fetcher;
