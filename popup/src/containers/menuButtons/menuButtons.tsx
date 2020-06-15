import React from 'react';
import MenuButton from './menuButton';

import { IconEnum } from '../../components/icon/iconEnum';
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
                icon={IconEnum.News}
                selected={props.isNewsScreenSelected}
                onClick={onNewsButtonClick}
            />
            <MenuButton
                icon={IconEnum.Settings}
                selected={!props.isNewsScreenSelected}
                onClick={onSettingsButtonClick}
            />
        </div>
    );
};

export default menuButtons;
