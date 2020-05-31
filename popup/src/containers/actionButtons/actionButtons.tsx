import { RootReducerState } from 'common';
import React from 'react';
import { connect } from 'react-redux';

export interface ActionButtonsStateProps {

}

export declare type ActionButtonsProps = ActionButtonsStateProps;

const mapStateToProps = (state: RootReducerState): ActionButtonsStateProps => {
    return {

    };
};

const actionButtons: React.FunctionComponent<ActionButtonsProps> = props => {
    return (
        <div className={'action-buttons'}>
            actionButtons
        </div>
    );
};

export default connect(mapStateToProps)(actionButtons);
