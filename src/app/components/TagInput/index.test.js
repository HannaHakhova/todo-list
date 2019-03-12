/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow} from 'enzyme';
import TagInput from './index';

const component = shallow(<TagInput handleSubmit={() => {}} />);

describe('TagInput', () => {
    it('matches expected snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('calls handleSubmit when form is submitted and sets empty state after call', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<TagInput handleSubmit={handleSubmit} />);
        wrapper.setState({title: 'test'});

        wrapper.find('Form').simulate('submit');

        expect(handleSubmit).toBeCalledWith('test');
        expect(wrapper.state().title).toEqual('');
    });

    it('handles change on some input', () => {
        component.find('FormInput').simulate('change', {target: {value: 'Test2'} });

        expect(component.state().title).toEqual('Test2');
    });
});