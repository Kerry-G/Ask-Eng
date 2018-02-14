import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './containers/App';
import About from './containers/About';
import Debug from './components/Debug/Debug.js';
import Home from './components/Home';
import Profile from './components/Profile';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
				<Route path='/about' component={About} />
				<Route path='/debug' component={Debug} />
				<Route path='/Home' component={Home} />
				<Route exact path='/users/:id' component={Profile} />
            </Switch>
        </BrowserRouter>
    )
	document.getElementById('app');
}