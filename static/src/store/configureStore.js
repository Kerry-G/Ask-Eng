import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
import promiseMiddleware from 'redux-promise';
//import * as allActions from '../actions/auth';


export const history = createHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(promiseMiddleware),
    )
)
//export const actions = allActions;
export default store
