import React from 'react';
import { Dropdown } from './../components/header/Dropdown';
import { mount,shallow } from 'enzyme';


describe("<Dropdown/>",()=>{
    it('should render',()=> {
        const dropdown = shallow(<Dropdown />);
        expect(dropdown)
    });
});