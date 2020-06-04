import React, { useState } from 'react';
import MenuButtons from './menuButtons/menuButtons';
import NewsScreen from './newsScreen/newsScreen';
import PricesSlider from './pricesSlider/pricesSlider';
import SettingsScreen from './settingsScreen/settingsScreen';

import './app.scss';

const app: React.FunctionComponent = () => {
    const [ isNewsScreenSelected, changeScreenSelection ] = useState(true);

    return (
        <React.Fragment>
            <PricesSlider />
            <div className={'app-content'}>
                {isNewsScreenSelected ? <NewsScreen /> : <SettingsScreen />}
            </div>
            <MenuButtons
                isNewsScreenSelected={isNewsScreenSelected}
                changeScreenSelection={changeScreenSelection}
            />
        </React.Fragment>
    );
};

export default app;
