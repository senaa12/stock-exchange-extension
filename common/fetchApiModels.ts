export enum FetchOptionsEnum {
    GetWallStreetStocks = '@FETCH/GET_WALL_STREET_STOCKS',
    GetCompanyProfile = '@FETCH/GET_COMPANY_PROFILE',
    GetQuotaForStock = '@FETCH/GET_QUOTA_FOR_STOCK'
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
    /** STOCKID */
    ticker: string;
    weburl: string;
    logo: string;
    finnhubIndustry: string;
}

export interface Quote {
    /** Open price of the day */
    o: number;
    /** High price of the day */
    h: number;
    /** Low price of the day */
    l: number;
    /** Current price */
    c: number;
    /** Previous close price */
    pc: number;
}
