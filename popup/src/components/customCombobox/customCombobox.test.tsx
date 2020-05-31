import { fireEvent } from '@testing-library/react';
import { Stock } from 'common';
import React from 'react';
import { ignoreConsoleError, renderWithReduxStore } from 'test-setup';
import { stocks } from '../../assets/mocks';
import CustomCombobox from './customCombobox';

ignoreConsoleError();

jest.mock('../../actions/appActions', () => ({
    addStockToFavorites: jest.fn().mockImplementation(() => ({ type: 'test' }))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

const setup = async(inputVal: string, storeStocks?: Array<Stock>) => {
    const testSetup = renderWithReduxStore(
        <CustomCombobox />,
        { appReducer: { stocks: storeStocks } }
    );

    const inputEl = await testSetup.getByPlaceholderText('Search stocks') as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: inputVal } });

    return { ...testSetup, inputElement: inputEl };
};

describe('CustomCombobox tests', () => {
    test('No data in store => display no data', async() => {
        const { getByTestId, inputElement } = await setup('test');
        expect(getByTestId('no-data')).toBeTruthy();
    });

    test('Clear search bar => clear value', async() => {
        const { inputElement, getByTestId } = await setup('test');

        const clearButton = await getByTestId('clear-button');
        fireEvent.click(clearButton);
        expect(inputElement.value).toEqual('');
    });

    it('Click on search result', async() => {
        // todo: finish test
        const { getByTestId } = await setup('test', stocks);

        const result = await getByTestId(stocks[0].symbol);
        fireEvent.click(result);
    });
});
