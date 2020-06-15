import { FetchOptionsEnum, getStorageLocal, News, RootReducerActions, RootReducerState, setStorageLocal } from 'common';
import deepmerge from 'deepmerge';
import moment from 'moment';
import { Store } from 'redux';
import apiFetcher from './apiFetcher';

class NewsLoader {
    // interval to fetch new news (1 sec = 1000 ms)
    private fetchInterval: number = 600000; // 10min

    // delete news after this amount of days
    private deleteNewsAfter: number = 7;

    /**
     * initialize news loader: registers store, makes initial fetch loader will continue to fetch news every fetchInterval minutes
     */
    private store: Store<RootReducerState, RootReducerActions>;
    public initialize = (storeToRegister: Store<RootReducerState, RootReducerActions>) => {
        this.store = storeToRegister;
        this.refreshNews();

        setInterval(() => this.refreshNews(), this.fetchInterval);
    }

    /**
     * deepmerge module array resolver
     * @param destArray
     * @param sourceArray
     * @param options
     */
    private mergeNewsArrays = (destArray: Array<News>, sourceArray: Array<News>, options: any): Array<News> => {
        // used to filter existing news
        const newArray = destArray.concat(sourceArray.filter(news => !destArray.find(n => n.id === news.id)));

        // do not keep older news than this.deleteNewsAfter¸or more than 150
        return newArray.filter((news: News, index: number) =>
            (moment.unix(news.datetime).isAfter(moment().add(-this.deleteNewsAfter, 'days')) || index > 150));
    }

    /**
     * refresh news in storage for favorite stocks
     */
    public refreshNews = async() => {
        const favoriteStocks = this.store.getState().appReducer.favoriteStocks;
        if(!favoriteStocks.length) {
            return;
        }

        let fetchedNews: Record<string, Array<News>> = {};
        for(const stock of favoriteStocks) {
            const newNews = await apiFetcher.apiFetch<Array<News>>(FetchOptionsEnum.GetCompanyNews, stock);
            if(newNews) {
                fetchedNews = { ...fetchedNews, [stock]: newNews };
            }
        }

        const savedNews = (await getStorageLocal<string>(FetchOptionsEnum.GetCompanyNews))?.data ?? {};

        const merged = deepmerge(savedNews, fetchedNews, {
            arrayMerge: this.mergeNewsArrays
        });
        await setStorageLocal(FetchOptionsEnum.GetCompanyNews, merged);

        return merged;
    }
}

const newsLoader = new NewsLoader();

export default newsLoader;
