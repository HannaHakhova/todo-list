/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {shallow} from 'enzyme';
import TodoList from './index';

const wrapper = shallow(<TodoList
    handleDelete={() => {}}
    handleComplete={() => {}}
    sortByDateAndCompleted={() => {}}
    activeItem='all'
    todos={[{
        id: '1',
        title: 'Todo1',
        completed: true,
        createdDate: new Date(2017, 1, 1)
    },
    {
        id: '2',
        title: 'Todo2',
        completed: true,
        createdDate: new Date(2017, 1, 1)
    },
    {
        id: '3',
        title: 'Todo3',
        completed: true,
        createdDate: new Date(2017, 1, 1)
    }]} />);

describe('TodoList component', () => {
    it('should match expected snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});