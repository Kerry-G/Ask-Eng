import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import About from './containers/About';
import Debug from './components/Debug/Debug.js';
import Home from './components/Home';
import Profile from './components/Profile';
export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/about' component={About} />
                <Route path='/debug' component={Debug} />
				<Route path='/Home' component={Home} />
				<Route path='/user/:userid'  component={Profile} />
				//handler={ (props, state,params) => <id userid = {params.user.id}/> }
	
            </Switch>
        </BrowserRouter>
    )
}