import React from 'react';
import MenuButton from './menuButton';

import './menuButtons.scss';

export interface MenuButtonsProps {
    isNewsScreenSelected: boolean;
    changeScreenSelection: (selectNews: boolean) => void;
}

const menuButtons: React.FunctionComponent<MenuButtonsProps> = props => {
    const onNewsButtonClick = () => props.changeScreenSelection(true);
    const onSettingsButtonClick = () => props.changeScreenSelection(false);

    return (
        <div className={'action-buttons'}>
            <MenuButton
                label={'News'}
                selected={props.isNewsScreenSelected}
                onClick={onNewsButtonClick}
            />
            <MenuButton
                label={'Settings'}
                selected={!props.isNewsScreenSelected}
                onClick={onSettingsButtonClick}
            />
        </div>
    );
};

export default menuButtons;
