import React from 'react';
import Login from './../components/body/LoginBox/Login';
import { mount,shallow } from 'enzyme';


describe("<Login/>",()=>{
    it('should render',()=> {
        const login = shallow(<Login />);
        expect(login)
    });
});