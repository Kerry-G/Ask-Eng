import React from 'react';
import Register from './../components/body/Register';
import { mount,shallow } from 'enzyme';


describe("<Register/>",()=>{
    it('should render',()=> {
        const register = shallow(<Register />);
        expect(register)
    });
});