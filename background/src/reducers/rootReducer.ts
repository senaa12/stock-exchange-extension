import { RootReducerState } from 'common';
import { combineReducers } from 'redux';
import appReducer, { appReducerInitialState } from './appReducer';

export const rootReducerInitialState: RootReducerState = {
    appReducer: appReducerInitialState,
};

export default combineReducers({
    appReducer
});
