import { render } from '@testing-library/react';
import { RecursivePartial, RootReducerState } from 'common';
import createStore from 'create-store';
import * as React from 'react';
import { Provider } from 'react-redux';

export const renderWithReduxStore = (comp: React.ReactElement, state: RecursivePartial<RootReducerState> = {}) => {
    const store = createStore(false, state);

    return {
        ...render(<Provider store={store}>{comp}</Provider>),
        store,
    };
};
