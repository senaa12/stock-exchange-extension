import { FetchOptionsEnum, RootReducerActions, RootReducerState } from 'common';
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
    private store: Store<RootReducerState, RootReducerActions>;
    public registerStore(storeToRegister: Store<RootReducerState, RootReducerActions>) {
        this.store = storeToRegister;
    }

    /**
     * makes api request to https://finnhub.io/ API and dispatches action to store
     * @param request
     * @param filter
     * @param dispatchActionType
     */
    public async apiFetch<T>(request: FetchOptionsEnum, filter?: string, dispatchActionType?: RootReducerActions['type']): Promise<T | undefined> {
        const url: string = this.getEndpoint(request, filter);

        try {
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json();

                if(dispatchActionType) {
                    this.store.dispatch({
                        type: dispatchActionType as any,
                        payload: {
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
}

const fetcher = new ApiFetcher();

export default fetcher;
