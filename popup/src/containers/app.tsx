import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
            <TransitionGroup className={'app-content'}>
                {isNewsScreenSelected &&
                    <CSSTransition
                        id={0}
                        timeout={300}
                        in={isNewsScreenSelected}
                        classNames={'page-left'}
                        unmountOnExit
                    >
                        <div className={'page-left'}>
                            <NewsScreen />
                        </div>
                    </CSSTransition>}
                {!isNewsScreenSelected &&
                    <CSSTransition
                        id={1}
                        timeout={300}
                        in={!isNewsScreenSelected}
                        classNames={'page-right'}
                        unmountOnExit
                    >
                        <div className={'page-right'}>
                            <SettingsScreen />
                        </div>
                    </CSSTransition>}
            </TransitionGroup>
            <MenuButtons
                isNewsScreenSelected={isNewsScreenSelected}
                changeScreenSelection={changeScreenSelection}
            />
        </React.Fragment>
    );
};

export default app;
