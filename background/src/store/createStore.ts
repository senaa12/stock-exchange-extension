import { RecursivePartial, RootReducerActions, RootReducerState } from 'common';
import deepmerge from 'deepmerge';
import { applyMiddleware, createStore, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer, { rootReducerInitialState } from '../reducers/rootReducer';

const getMiddleware = (isProd: boolean) => {
    const middleware: Array<any> = [thunk];
    if (!isProd) {
        middleware.push(logger);
    }

    return middleware;
};

export default (isProd: boolean, initialStateOverride: RecursivePartial<RootReducerState> = {}): Store<RootReducerState, RootReducerActions> => {
    const initialState = deepmerge(rootReducerInitialState, initialStateOverride) as RootReducerState;
    const middleware = getMiddleware(isProd);

    return createStore<RootReducerState, RootReducerActions, any, any>(
        rootReducer,
        initialState,
        !!middleware ? applyMiddleware(...middleware) : undefined,
    );
};
