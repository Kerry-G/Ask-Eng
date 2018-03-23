import React from 'react';
import Footer from './../components/footer/Footer';
import { mount,shallow } from 'enzyme';


describe("<Footer/>",()=>{
    it('should render',()=> {
        const footer = shallow(<Footer />);
        expect(footer)
    });
});