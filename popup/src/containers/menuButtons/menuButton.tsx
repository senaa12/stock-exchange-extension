import classNames from 'classnames';
import React from 'react';

export interface MenuButtonProps {
    label: 'News' | 'Settings';
    selected: boolean;
    onClick: () => void;
}

export const menuButton: React.FunctionComponent<MenuButtonProps> = props => {
    const className = classNames('menu-button', {
        'left': props.label === 'Settings',
        'right': props.label === 'News',
        'selected': props.selected
    });

    return (
        <div className={className} onClick={props.onClick}>
            {props.label}
        </div>
    );
};

export default menuButton;
