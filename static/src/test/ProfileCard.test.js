import React from 'react';
import { ProfileCard } from './../components/body/Profile/ProfileCard';
import { mount,shallow } from 'enzyme';


describe("<ProfileCard/>",()=>{
    it('should render',()=> {
        const profileCard = shallow(<ProfileCard />);
        expect(profileCard)
    });
});