export enum FetchOptionsEnum {
    GetWallStreetStocks = '@FETCH/GET_WALL_STREET_STOCKS',
    GetCompanyProfile = '@FETCH/GET_COMPANY_PROFILE'
}

export interface LocalStorageData<T> {
    dateString: string;
    data: T;
}

export interface Stock {
    description: string;
    displaySymbol: string;
    symbol: string;
}

export interface CompanyProfile {
    country: string;
    currency: string;
    exchange: string;
    ipo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
    logo: string;
    finnhubIndustry: string;
}
