import React from 'react';
import Votes from './../components/votes/Votes.js';
import {shallow} from 'enzyme';

describe("<Votes/>",()=>{
    it('should render',()=>{
        const votes = shallow(<Votes question={{
            question: {
                ups: 0,
                downs: 0
            }
        }}/>);
    });

    it('should be black at the beginning - status 0', ()=> {
        const votes = shallow(<Votes question={{
            question: {
                ups: 0,
                downs: 0
            }
        }}/>);
        expect(votes.state('color')).toEqual("black")
    });

    it('should be red when the status is 1 (ups)', ()=>{
        const votes = shallow(<Votes question={{
            question: {
                ups: 0,
                downs: 0
            }
        }}/>);
        votes.setState({status:1});
        expect(votes.state('color')).toEqual("red")
    });

    it('should be blue when the status is -1(downs)', ()=>{
        const votes = shallow(<Votes question={{
            question: {
                ups: 0,
                downs: 0
            }
        }}/>);
        votes.setState({status:-1});
        expect(votes.state('color')).toEqual("blue")
    });

    it('should show the right amount of votes', ()=>{
        const positive = shallow(<Votes question={{
                ups: 100,
                downs: 90
            }
        }/>);
        const negative = shallow(<Votes question={{
            ups: 90,
            downs: 100
        }
        }/>);
        expect(positive.state().vote).toEqual(10);
        expect(negative.state().vote).toEqual(-10);

    });

});