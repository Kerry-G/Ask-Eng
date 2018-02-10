import configureStore from './configureStore'

export const login = (user) => {
    configureStore.store.dispatch({
        type:"USER_CONNECTION",
        payload: user
    })
}

export const logOut = () => {
    configureStore.store.dispatch({
        type:"LOG_OUT"
    })
}