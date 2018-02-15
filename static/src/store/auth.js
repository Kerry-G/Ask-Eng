import configureStore from './configureStore'

export const login = (user) => {
    configureStore.store.dispatch({
        type:"USER_CONNECTION",
        payload: user
    })
	window.location.reload();
}

export const updateUser = (user) => {
    configureStore.store.dispatch({
        type:"USER_UPDATE",
        payload: user
    })
}

export const logOut = () => {
    configureStore.store.dispatch({
        type:"LOG_OUT"
    })
	window.location.reload();
}

export const reload = () => {
	if (this.props.location.pathname === "/users/:id")
	window.location.reload();
}