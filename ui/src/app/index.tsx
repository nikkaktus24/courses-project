import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers';

const store = createStore(rootReducer);
const rootEl = document.getElementById('root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer>
                <App/>
            </AppContainer>
        </ConnectedRouter>
    </Provider>,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NewApp = require('./components/App').default;

        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppContainer>
                        <NewApp/>
                    </AppContainer>
                </ConnectedRouter>
            </Provider>,
            rootEl
        );
    });
}
