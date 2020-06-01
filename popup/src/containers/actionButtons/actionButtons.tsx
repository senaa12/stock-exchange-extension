import { AppStateEnum, RootReducerState } from 'common';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeAppState } from '../../actions/appActions';
import ButtonComponent from '../../components/buttonComponent/buttonComponent';
import { IconEnum } from '../../components/icon/iconEnum';

import './actionButtons.scss';

export interface ActionButtonsStateProps {

}

export interface ActionButtonsDispatchProps {
    changeAppState: (newState: AppStateEnum) => void;
}

export declare type ActionButtonsProps = ActionButtonsStateProps & ActionButtonsDispatchProps;

const mapStateToProps = (state: RootReducerState): ActionButtonsStateProps => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch): ActionButtonsDispatchProps => {
    return {
        changeAppState: (newState: AppStateEnum) => dispatch(changeAppState(newState))
    };
};

const actionButtons: React.FunctionComponent<ActionButtonsProps> = props => {
    const onClick = useCallback((newState: AppStateEnum) => () => props.changeAppState(newState), []);

    return (
        <div className={'action-buttons'}>
            <ButtonComponent
                icon={IconEnum.News}
                label={'News'}
                onClick={onClick(AppStateEnum.NewsScreen)}
            />
            <ButtonComponent
                className={'action-buttons__favorite'}
                icon={IconEnum.Star}
                label={'Favorite stocks'}
                onClick={onClick(AppStateEnum.SelectFavorites)}
            />
            <ButtonComponent
                icon={IconEnum.Settings}
                label={'Settings'}
                onClick={onClick(AppStateEnum.Settings)}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(actionButtons);
