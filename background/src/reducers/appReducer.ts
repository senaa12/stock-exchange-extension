import { AppActionEnum, AppReducerState } from 'common';
import { Action } from 'redux';

export const appReducerInitialState: AppReducerState = {
    nativeClientEnabled: false
};

export default (state = appReducerInitialState, action: Action<AppActionEnum>): AppReducerState => {
    switch(action.type) {
        // default: {
        //     const type: never = action.type;
        //     return state;
        // }
    }
    return state;
};
