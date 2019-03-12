/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {shallow} from 'enzyme';
import Tag from './index';

describe('Tag', () => {
    it('matches expected snapshot)', () => {
        expect(shallow(<Tag
            handleDelete={() => {}}
            tag={{id: '123456', title: 'test'}} />)).toMatchSnapshot();
    });

    it('calls handleDelete when it is clicked', () => {
        const handleDelete = jest.fn();
        const wrapper = shallow(<Tag
            handleDelete={handleDelete}
            tag={{id: '123456', title: 'test'}} />);

        wrapper.find('Icon').simulate('click');

        expect(handleDelete).toBeCalledWith('123456');
    });
});