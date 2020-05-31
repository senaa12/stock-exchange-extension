import * as React from 'react';
import CustomCombobox from './customCombobox/customCombobox';
import PricesSlider from './pricesSlider/pricesSlider';

import './app.scss';

export interface AppProps {

}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <PricesSlider />
                <CustomCombobox />
            </div>
        );
    }
}

export default App;
