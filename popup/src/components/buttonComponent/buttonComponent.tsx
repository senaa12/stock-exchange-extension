import classNames from 'classnames';
import React, { useMemo } from 'react';
import Icon from '../icon/icon';
import { IconEnum, IconSize } from '../icon/iconEnum';

import './buttonComponent.scss';

export interface CustomButtonProps {
    label: string;
    icon: IconEnum;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
    tooltip?: string;
    iconSize?: IconSize;
    disabled?: boolean;
}

const customButton = (props: CustomButtonProps) => {
    const className = classNames('flex-column', 'button-base', props.className, {
        selected: props.isSelected,
        disabled: props.disabled,
        clickable: !props.disabled,
    });
    const onClick = useMemo(() => {
        if (!props.disabled) {
            return props.onClick;
        }
    }, [props.onClick, props.disabled]);

    return (
        <div title={props.tooltip} className={className} onClick={onClick} data-testid={props.label}>
            <Icon className={'button-icon'} iconName={props.icon} iconSize={props.iconSize} />
            <div className={'label'}>{props.label}</div>
        </div>
    );
};

export default customButton;
