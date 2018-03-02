import React from 'react';
import { App } from './../containers/App';
import { Provider } from 'react-redux'
import { mount,shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

// const store = configureStore({user:{
//     id:1
//     }});
// const test = <Provider store={store}><App /></Provider>;

describe("<App/>",()=>{

    it('should render',()=> {
        const app = shallow(<App />);
        expect(app)
    });

});