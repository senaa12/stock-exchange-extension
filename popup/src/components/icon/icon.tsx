import classNames from 'classnames';
import React, { useEffect } from 'react';
import { IconEnum, IconSize } from './iconEnum';

export interface IconProps {
    iconName: IconEnum;
    className?: string;
    iconSize?: IconSize;
    style?: React.CSSProperties;
    onClick?: () => void;
    testId?: string;
}

const icon = (props: IconProps) => {
    useEffect(() => {
        try {
            require(`../../assets/icons/${props.iconName}.svg`);
        } catch (ex) {
            // tslint:disable-next-line:no-console
            console.error(ex);
        }
    }, []);

    const className = classNames(props.iconName, props.className, 'icon', 'svg-icon');
    return(
        <svg
            className={className}
            height={props.iconSize ? props.iconSize : IconSize.Small}
            width={props.iconSize ? props.iconSize : IconSize.Small}
            style={props.style}
            onClick={props.onClick}
            data-testid={props.testId}
        >
            <use xlinkHref={`#${props.iconName}`} />
        </svg>
    );
};

export default icon;
