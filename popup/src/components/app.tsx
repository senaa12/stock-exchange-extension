import * as React from 'react';

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
                app
            </div>
        );
    }
}

export default App;
