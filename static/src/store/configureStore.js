import { createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import {persistStore, persistReducer} from 'redux-persist'
import rootReducer from './reducers'
import storage from 'redux-persist/lib/storage'
//import * as allActions from '../actions/auth';


export const history = createHistory();
//redux-persist
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
    persistedReducer
)
let persistor = persistStore(store)
//export const actions = allActions;
export default {store,persistor}