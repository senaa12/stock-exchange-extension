import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import './slider.scss';

export interface SliderProps {
    /** keys from children that will be rendered in slider  */
    childrenKeys: Array<string>;
    /** width of each child */
    childWidth: number;
    /** fuction to render child */
    childRenderer: (key: string, cssToInject: React.CSSProperties) => React.ReactNode;
    /** slide duration in seconds (speed) */
    slideDuration: number;
    /** slider classname */
    className?: string;
}

const slider: React.FunctionComponent<SliderProps> = (props) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const [lineRefInitialized, setLineRefInitialized] = useState<boolean>(false);

    /**
     * width of sliding line is dynamically calculated, if the 100% width + length of one child left and right is too small,
     * than it will increase so that all children can get into it (+ some 10px padding is included, that should be equal to childrens padding
     * so in the future this value should be also sent through props?)
     */
    const lineStyle: React.CSSProperties = useMemo(() => {
        if(!lineRef.current) {
            return {
                width: '100%'
            } as React.CSSProperties;
        }

        const windowWidth = document.body.offsetWidth;
        let newStyle: React.CSSProperties = {
            position: 'relative',
        };

        // if (windowWidth + minChildWidth from each side < stocks * minChildWidth) => line must be wider
        if((windowWidth + 2 * props.childWidth) / props.childrenKeys.length < (props.childWidth + 10)) {
            const newWidth = props.childrenKeys.length * (props.childWidth + 10);
            newStyle = {
                ...newStyle,
                left: -(newWidth - windowWidth) / 2,
                width: newWidth
            };
        } else {
            newStyle = {
                ...newStyle,
                left: -props.childWidth,
                width: windowWidth + 2 * props.childWidth
            };
        }

        return newStyle;
    }, [lineRefInitialized]);

    /** this is animation duration, it needs to increase if the length of sliding line increases */
    const animationDuration = useMemo(() => {
        if(!lineStyle.width) {
            return props.slideDuration;
        }

        const windowWidth = document.body.offsetWidth;
        const sliderLineIncreace = (lineStyle.width as number) / windowWidth;

        return Math.round(props.slideDuration * sliderLineIncreace);
    }, [lineStyle, lineRefInitialized]);

    //#region CHILDRENS POSITION
    /**
     * next part is calculating in percentage how much is child with index @param index is away from left border of the slider line
     * value is calculated in percentage; line has flex display, and justify content space around so every child takes same space
     * that value determines what animation will use; CSS contains 100 animations - one for every percentage where the child is placed in line
     */
    const spaceOneChildTakes = useMemo(() => {
        if(!lineStyle.width) {
            return 0;
        }
        return Math.round((lineStyle.width as number) / props.childrenKeys.length);
    }, [lineStyle, lineRefInitialized]);

    // total offset from left borer in one space for child
    const offsetFromLeftBorder = useMemo(() => {
        if(!spaceOneChildTakes) {
            return 0;
        }
        return (spaceOneChildTakes - props.childWidth) / 2;
    }, [spaceOneChildTakes, lineRefInitialized]);

    const calculateLeftLengthPercentage = (index: number) => {
        const totalLeft = (spaceOneChildTakes * index) + offsetFromLeftBorder;
        return Math.round(totalLeft / (lineStyle.width as number) * 100);
    };
    //#endregion

    useEffect(() => {
        if(lineRef.current) {
            setLineRefInitialized(true);
        }
    }, [lineRef]);


    const className = classNames('slider', props.className);
    return (
        <div className={className} ref={lineRef} style={lineStyle}>
            {lineRefInitialized && props.childrenKeys.map((val, index) => {
                const offset = calculateLeftLengthPercentage(index);
                if(isNaN(offset)) {
                    return <></>;
                }

                const styleToInject: React.CSSProperties = {
                        animation: `slide-${offset} ${animationDuration}s linear infinite`,
                        position: 'relative',
                        width: props.childWidth
                };

                return props.childRenderer(val, styleToInject);
            })}
        </div>
    );
};

export default slider;
