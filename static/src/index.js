
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import AppRoutes from './Routes'
import { PersistGate } from 'redux-persist/integration/react'

// css imports
import 'react-select/dist/react-select.css';
import './styles.css';
import './animated.css';

const target = document.querySelector('#root');
console.log(configureStore.persistor) 
ReactDOM.render(
    <Provider store={configureStore.store}>
        <PersistGate loading={null} persistor={configureStore.persistor}>
            <AppRoutes />
        </PersistGate>
    </Provider>,
    target
);

