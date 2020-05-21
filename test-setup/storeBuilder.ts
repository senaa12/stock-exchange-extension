import { RecursivePartial, RootReducerState } from 'common';
import createStore from 'create-store';

// tslint:disable-next-line: no-var-requires
const merge = require('deepmerge');

export class StoreBuilder {
    private state: RootReducerState;
    private constructor() { }

    public static create(initialStore: RecursivePartial<RootReducerState> = {}) {
        const store = new StoreBuilder();
        store.state = createStore(false, initialStore).getState();

        return store;
    }

    public getState() {
        return this.state;
    }

    public setState(state: RecursivePartial<RootReducerState>) {
        this.state = merge(this.state, state);
        return this;
    }
}
