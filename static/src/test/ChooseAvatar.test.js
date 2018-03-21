import React from 'react';
import { ChooseAvatar } from './../components/body/LoginBox/ChooseAvatar';
import { mount,shallow } from 'enzyme';


describe("<ChooseAvatar/>",()=>{
    it('should render',()=> {
        const chooseAvatar = shallow(<ChooseAvatar />);
        expect(chooseAvatar)
    });
});