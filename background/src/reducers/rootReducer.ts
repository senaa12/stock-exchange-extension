import { RootReducerState } from 'common';
import { combineReducers } from 'redux';
import appReducer, { appReducerInitialState } from './appReducer';
import quoteReducer, { quoteReducerIntialState } from './quoteReducer';

export const rootReducerInitialState: RootReducerState = {
    appReducer: appReducerInitialState,
    quoteReducer: quoteReducerIntialState
};

export default combineReducers<RootReducerState>({
    appReducer,
    quoteReducer
});
