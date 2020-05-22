import { BackgroundMessageTypeEnum, CompanyProfile, FetchOptionsEnum, getStorageLocal, setStorageLocal } from 'common';
import { useEffect, useReducer } from 'react';
import communicationManager from './communicationManager';

interface CompanyProfileAction {
    type: FetchOptionsEnum.GetCompanyProfile;
    result: CompanyProfile;
}

/**
 * hook to use company profile informations
 * this informations are not saved in redux store and are read directly from storage.local
 * @param symbol
 */
export default function useCompanyProfile(symbol: string): CompanyProfile | undefined {
    const reducer = (state: CompanyProfile | undefined, action: CompanyProfileAction) => {
        switch(action.type) {
            case FetchOptionsEnum.GetCompanyProfile: {
                return action.result;
            }
            default:
                return state;
        }
    };
    const [data, dispatch] = useReducer(reducer, undefined);

    useEffect(() => {
        const fetchData = async() => {
            const storageData = await getStorageLocal<Record<string, CompanyProfile>>(FetchOptionsEnum.GetCompanyProfile);

            if(!storageData || !storageData.data[symbol]) {
                const processResponse = async(loadedData: CompanyProfile) => {
                    if(loadedData) {
                        setStorageLocal(FetchOptionsEnum.GetCompanyProfile, {
                            ...storageData?.data,
                            [symbol]: loadedData
                        });

                        dispatch({
                            type: FetchOptionsEnum.GetCompanyProfile,
                            result: loadedData
                        });
                    }
                };

                communicationManager.sendMessageToBackgroundPage<BackgroundMessageTypeEnum.ApiFetch>({
                    type: BackgroundMessageTypeEnum.ApiFetch,
                    data: {
                        filter: symbol,
                        request: FetchOptionsEnum.GetCompanyProfile
                    }
                }, processResponse);
            } else {
                dispatch({
                    type: FetchOptionsEnum.GetCompanyProfile,
                    result: storageData.data[symbol]
                });
            }
        };

        fetchData();
    }, []);

    return data;
}
