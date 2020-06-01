import * as React from 'react';
import ActionButtons from './actionButtons/actionButtons';
import AppContent from './appContent/appContent';
import PricesSlider from './pricesSlider/pricesSlider';

import './app.scss';

const app: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <PricesSlider />
            <AppContent />
            <ActionButtons />
        </React.Fragment>
    );
};

export default app;
