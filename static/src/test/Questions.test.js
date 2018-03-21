import React from 'react';
import { Questions } from './../components/body/Questions/Questions';
import { mount,shallow } from 'enzyme';


describe("<Question/>",()=>{
    it('should render',()=> {
        const questions = shallow(<Questions />);
        expect(questions)
    });
});