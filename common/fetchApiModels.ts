export enum FetchOptionsEnum {
    GetWallStreetStocks = '@FETCH/GET_WALL_STREET_STOCKS',
    GetCompanyProfile = '@FETCH/GET_COMPANY_PROFILE',
    GetQuotaForStock = '@FETCH/GET_QUOTA_FOR_STOCK'
}

export interface LocalStorageData<T> {
    dateString: string;
    data: T;
}

export interface FetchReduxActionResult<T> {
    fetchedData: T;
    filter?: string | number;
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

export interface News {
    category: string;
    /** published time in UNIX timestamp */
    datetime: number;
    headline: string;
    id: number;
    image: string;
    /** news related to stock ID */
    related: string;
    source: string;
    summary: string;
    url: string;
}
