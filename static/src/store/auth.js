import store from './configureStore'

export const login = (user) => {
    store.dispatch({
        type:"USER_CONNECTION",
        payload: user
    })
}

export const logOut = () => {
    store.dispatch({
        type:"LOG_OUT"
    })
}