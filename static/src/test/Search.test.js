import React from 'react';
import Search from './../components/body/Questions/Search';
import { mount,shallow } from 'enzyme';


describe("<Search/>",()=>{
    it('should render',()=> {
        const search = shallow(<Search />);
        expect(search)
    });
});