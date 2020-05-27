import { ActionType, AppActionEnum, FetchOptionsEnum, getStorageLocal, RootReducerState, setStorageLocal } from 'common';
import moment from 'moment';
import { Store } from 'redux';

export const endpoints: Record<FetchOptionsEnum, (filter?: string) => string> = {
    [FetchOptionsEnum.GetWallStreetStocks]: () => '/stock/symbol?exchange=US',
    [FetchOptionsEnum.GetCompanyProfile]: (filter: string) => `/stock/profile2?symbol=${filter}`,
    [FetchOptionsEnum.GetQuotaForStock]: (filter: string) => `/quote?symbol=${filter}`
};

class ApiFetcher {
    private endpointBase: string = 'https://finnhub.io/api/v1';
    private getEndpoint(requestType: FetchOptionsEnum, filter?: string) {
        const endpointFunction = endpoints[requestType];
        return `${this.endpointBase}${endpointFunction(filter)}&token=${process.env.FINNHUB_TOKEN}`;
    }

    // must call at the beginning
    private store: Store<RootReducerState>;
    public registerStore(storeToRegister: Store<RootReducerState>) {
        this.store = storeToRegister;
    }

    /**
     * makes api request to https://finnhub.io/ API and dispatches action to store
     * @param request
     * @param filter
     * @param dispatchActionType
     */
    public async apiFetch<T>(request: FetchOptionsEnum, filter?: string, dispatchActionType?: ActionType): Promise<T | undefined> {
        const url: string = this.getEndpoint(request, filter);

        try {
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json();

                if(dispatchActionType) {
                    this.store.dispatch({
                        type: dispatchActionType,
                        data: {
                            fetchedData: data,
                            filter
                        }
                    });
                }

                return Promise.resolve(data as T);
            } else {
                console.error(response);
                return Promise.reject(undefined);
            }

        } catch(ex) {
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
    public async loadFromStorageOrFetch(fetchType: FetchOptionsEnum, dispatchActionType?: ActionType, refreshIfOlderThan?: moment.Moment) {
        const storedData = await getStorageLocal<any>(fetchType);

        if(!storedData || (refreshIfOlderThan ? moment(storedData.dateString) < refreshIfOlderThan : true)) {
            const result = await this.apiFetch(fetchType, undefined, dispatchActionType);

            if(result) {
                setStorageLocal(fetchType, result);

                this.store.dispatch({
                    type: dispatchActionType,
                    data: result
                });
            }
        } else {
            this.store.dispatch({
                type: dispatchActionType,
                data: storedData.data
            });
        }
    }
}

const fetcher = new ApiFetcher();

export default fetcher;
