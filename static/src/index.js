
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import AppRoutes from './Routes'
// css imports
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-select/dist/react-select.css';
import './styles.css'
const target = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    target
);

