import { BackgroundMessageTypeEnum, BackgroundPayloadMapper, FetchOptionsEnum, getStorageLocal, News } from 'common';
import { useEffect, useState } from 'react';
import communicationManager from './communicationManager';

/**
 * hook to use stored news in storage.local
 * just pass stockIDs from companies you want to see
 * @param stocksFilter
 */
export default function useNews(stocksFilter: Array<string>) {
    const [ news, setNews ] = useState<undefined | Array<News>>();

    const fetchData = async() => {
        const storageData = await getStorageLocal<Record<string, Array<News>>>(FetchOptionsEnum.GetCompanyNews);

        if(storageData && storageData.data) {
            let generatedNews: Array<News> = new Array<News>();
            stocksFilter.forEach(s => {
                const companyNews = storageData.data[s];

                if(companyNews) {
                    generatedNews = generatedNews.concat(companyNews);
                } else {
                    communicationManager.sendMessageToBackgroundPage<BackgroundPayloadMapper, BackgroundMessageTypeEnum.RefreshNews>({
                        type: BackgroundMessageTypeEnum.RefreshNews,
                        payload: null
                    }, fetchData);
                }
            });

            setNews(generatedNews.sort((first: News, second: News) => first.datetime - second.datetime));
        }
    };

    useEffect(() => {
        fetchData();
    }, [stocksFilter]);

    return news;
}
