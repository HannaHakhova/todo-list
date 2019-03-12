/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow, mount} from 'enzyme';
import Footer from './index';

const component = shallow(<Footer todos={[{title: 'Test1', completed: false}]} handleClearCompleted={() => {}} handleActiveItemChange={() => {}} />);

describe('Footer', () => {
    it('matchs expected snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('calls handleItemClick when click on menu item', () => {
        const handleActiveItemChange = jest.fn();
        const wrapper = mount(<Footer todos={[]} handleClearCompleted={() => {}} handleActiveItemChange={handleActiveItemChange} />);
        wrapper.setState({activeItem: 'bar'});

        wrapper.find('MenuItem').first().simulate('click');

        expect(handleActiveItemChange).toBeCalledWith('all');
        expect(wrapper.state().activeItem).toEqual('all');
    });

    it('calls handleClearCompleted when click on the last menu item', () => {
        const handleClearCompleted = jest.fn();
        const wrapper = shallow(<Footer todos={[]} handleClearCompleted={handleClearCompleted} handleActiveItemChange={() => {}} />);

        wrapper.find('Button').simulate('click');

        expect(handleClearCompleted).toBeCalled();
    });
});