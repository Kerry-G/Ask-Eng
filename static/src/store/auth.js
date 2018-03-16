import configureStore from './configureStore'

export const login = (user) => {
    configureStore.store.dispatch({
        type:"USER_CONNECTION",
        payload: user
    })
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
	//If user is viewing the edit form and logs out, redirect to the home page. 
	if ((window.location.href).includes('/edit'))
		window.location.href = ((window.location.href).split('/edit')[0])
}

export const reload = () => {
	// if (this.props.location.pathname === "/users/:id")
	// window.location.reload();
}