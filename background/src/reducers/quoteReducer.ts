import { Action, QuoteActionEnum, QuoteReducerState } from 'common';

export const quoteReducerIntialState: QuoteReducerState = {};

export default (state = quoteReducerIntialState, action: Action<QuoteActionEnum>): QuoteReducerState => {
    switch(action.type) {
        case QuoteActionEnum.SetQouteForStock: {
            return {
                ...state,
                [action.data.filter]: action.data.fetchedData
            };
        }
        default: {
            const type: never = action.type;
            return state;
        }
    }
};
