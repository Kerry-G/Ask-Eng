import configureStore from './configureStore'

export const login = (user) => {
    configureStore.store.dispatch({
        type:"USER_CONNECTION",
        payload: user
    })
	window.location.reload();
}

export const logOut = () => {
    configureStore.store.dispatch({
        type:"LOG_OUT"
    })
	window.location.reload();
}

export const reload = () => {
	window.location.reload();
}