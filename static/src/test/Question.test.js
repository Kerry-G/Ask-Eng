import React from 'react';
import { Question } from './../components/body/Questions/Question';
import { mount,shallow } from 'enzyme';


describe("<Question/>",()=>{
    it('should render',()=> {
        const question = shallow(<Question />);
        expect(question)
    });
});