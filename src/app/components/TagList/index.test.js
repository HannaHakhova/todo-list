/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {shallow} from 'enzyme';
import TagList from './index';

const wrapper = shallow(<TagList
    handleDelete={() => {}}
    tags={[{
        id: '1',
        title: 'Tag1'
    },
    {
        id: '2',
        title: 'Tag2'
    },
    {
        id: '3',
        title: 'Tag3'
    }]} />);

describe('TagList component', () => {
    it('should match expected snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});