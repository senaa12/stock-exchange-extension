import { areArraysEqual, BackgroundMessageTypeEnum, BackgroundPayloadMapper, FetchOptionsEnum, getStorageLocal, News } from 'common';
import { useEffect, useState } from 'react';
import communicationManager from './communicationManager';

/**
 * hook to use stored news in storage.local
 * just pass stockIDs from companies you want to see
 * @param stocksFilter
 */
export default function useNews(stocksFilter: Array<string>) {
    const [ insideFilter, setInsideFilter ] = useState(stocksFilter);
    const [ news, setNews ] = useState<Array<News> | undefined>();

    const tryDistinctNews = (value: News, index: number, self: Array<News>) => {
        return self.findIndex(el => el.headline.toLowerCase() === value.headline.toLowerCase()) === index;
    };

    const fetchData = async() => {
        const storageData = await getStorageLocal<Record<string, Array<News>>>(FetchOptionsEnum.GetCompanyNews);

        if(storageData && storageData.data) {
            let generatedNews: Array<News> = new Array<News>();
            stocksFilter.forEach(s => {
                const companyNews = storageData.data[s];

                if(companyNews && companyNews.length) {
                    generatedNews = generatedNews.concat(companyNews);
                } else {
                    communicationManager.sendMessageToBackgroundPage<BackgroundPayloadMapper, BackgroundMessageTypeEnum.RefreshNews>({
                        type: BackgroundMessageTypeEnum.RefreshNews,
                        payload: null
                    });
                }
            });

            setNews(generatedNews
                .sort((first: News, second: News) => second.datetime - first.datetime)
                .filter(tryDistinctNews)
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, [insideFilter]);

    useEffect(() => {
        // set inner filter if outer value is changed
        if(!areArraysEqual(stocksFilter, insideFilter)) {
            setInsideFilter(stocksFilter);
        }
    }, [stocksFilter]);

    return news;
}
