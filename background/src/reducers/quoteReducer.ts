import { QuoteActionEnum, QuoteReducerActions, QuoteReducerState } from 'common';

export const quoteReducerIntialState: QuoteReducerState = {};

export default (state = quoteReducerIntialState, action: QuoteReducerActions): QuoteReducerState => {
    switch(action.type) {
        case QuoteActionEnum.SetQuoteForStock: {
            return {
                ...state,
                [action.payload.filter!]: action.payload.fetchedData
            };
        }
        default: {
            const type: never = action.type;
            return state;
        }
    }
};
