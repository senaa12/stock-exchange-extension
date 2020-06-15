import classNames from 'classnames';
import React from 'react';
import Icon from '../../components/icon/icon';
import { IconEnum } from '../../components/icon/iconEnum';

export interface MenuButtonProps {
    icon: IconEnum.Settings | IconEnum.News;
    selected: boolean;
    onClick: () => void;
}

export const menuButton: React.FunctionComponent<MenuButtonProps> = props => {
    const className = classNames('menu-button', {
        'left': props.icon === IconEnum.Settings,
        'right': props.icon === IconEnum.News,
        'selected': props.selected
    });

    return (
        <div className={className} onClick={props.onClick}>
            <Icon iconName={props.icon} />{props.icon === IconEnum.News ? ' News' : ' Settings'}
        </div>
    );
};

export default menuButton;
