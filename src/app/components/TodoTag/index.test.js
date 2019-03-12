/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {shallow} from 'enzyme';
import TodoTag from './index';

describe('TodoTag', () => {
    it('matches expected snapshot)', () => {
        expect(shallow(<TodoTag
            handleDeleteTodoTag={() => {}}
            todoTag={{id: '123456', title: 'test', bindingId: 4}} />)).toMatchSnapshot();
    });

    it('calls handleDeleteTodoTag when it is clicked', () => {
        const handleDeleteTodoTag = jest.fn();
        const wrapper = shallow(<TodoTag
            handleDeleteTodoTag={handleDeleteTodoTag}
            tag={{id: '123456', title: 'test', bindingId: 4}} />);

        wrapper.find('Icon').simulate('click');

        expect(handleDeleteTodoTag).toBeCalledWith('123456');
    });
});