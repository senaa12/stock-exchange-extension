
import * as React from 'react';
import { renderWithReduxStore } from 'test-setup';
import App from './app';

const setup = () => {
    return renderWithReduxStore(
        <App />,
    );
};

describe('App test', () => {
    test('first', () => {
        // const { getByText } = setup();
        // getByText('app');
    });
});
