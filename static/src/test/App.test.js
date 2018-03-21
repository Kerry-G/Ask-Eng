import React from 'react';
import { App } from './../containers/App';
import { mount,shallow } from 'enzyme';


describe("<App/>",()=>{
    it('should render',()=> {
        const app = shallow(<App />);
        expect(app)
    });
});