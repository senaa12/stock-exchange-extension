import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, Store } from 'webext-redux';
import App from './components/app';

import './index.scss';

const store = new Store();
const storeWithMiddleware = applyMiddleware(store, ...[thunk]);

storeWithMiddleware.ready().then(() => {
    ReactDOM.render(
        <Provider store={store} >
            <App />
        </Provider>,
        document.getElementById('app'),
    );
});
