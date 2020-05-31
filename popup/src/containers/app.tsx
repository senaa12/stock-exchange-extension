import * as React from 'react';
import ActionButtons from './actionButtons/actionButtons';
import CustomCombobox from './customCombobox/customCombobox';
import PricesSlider from './pricesSlider/pricesSlider';

import './app.scss';

export interface AppProps {

}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    public renderAppContent() {
        return (
            <div className={'app-content'}>
                <CustomCombobox />
            </div>
        );
    }

    public render() {
        return (
            <>
                <PricesSlider />
                {this.renderAppContent()}
                <ActionButtons />
            </>
        );
    }
}

export default App;
