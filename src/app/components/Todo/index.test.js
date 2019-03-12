/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {shallow} from 'enzyme';
import Todo from './index';

describe('Todo', () => {
    it('matches expected snapshot when completed is true)', () => {
        expect(shallow(<Todo
            handleDelete={() => {}}
            handleComplete={() => {}}
            handleDeleteTodoTag={() => {}}
            sortByDateAndCompleted={() => {}}
            addTodoTag={() => {}}
            todo={{id: '123456', title: 'test', completed: true, createdDate: new Date(1900, 1, 1)}} />)).toMatchSnapshot();
    });

    it('matches expected snapshot when completed is false) ', () => {
        expect(shallow(<Todo
            handleDelete={() => {}}
            handleComplete={() => {}}
            sortByDateAndCompleted={() => {}}
            addTodoTag={() => {}}
            handleDeleteTodoTag={() => {}}
            todo={{id: '123456', title: 'test', completed: false, createdDate: new Date(1900, 1, 1)}} />)).toMatchSnapshot();
    });

    it('calls handleComplete when checkbox is clicked', () => {
        const handleComplete = jest.fn();
        const wrapper = shallow(<Todo
            handleDelete={() => {}}
            handleComplete={handleComplete}
            sortByDateAndCompleted={() => {}}
            addTodoTag={() => {}}
            handleDeleteTodoTag={() => {}}
            todo={{id: '123456', title: 'test', completed: false, createdDate: new Date(1900, 1, 1)}} />);

        wrapper.find('Checkbox').simulate('change');

        expect(handleComplete).toBeCalledWith('123456');
    });

    it('calls sortByCreatedDateAndCompleted when label is clicked', () => {
        const sortByCreatedDateAndCompleted = jest.fn();
        const wrapper = shallow(<Todo
            handleDelete={() => {}}
            handleComplete={() => {}}
            sortByDateAndCompleted={sortByCreatedDateAndCompleted}
            addTodoTag={() => {}}
            handleDeleteTodoTag={() => {}}
            todo={{id: '123456', title: 'test', completed: false, createdDate: new Date(1900, 1, 1)}} />);

        wrapper.find('Label').simulate('click');

        expect(sortByCreatedDateAndCompleted).toBeCalled();
    });

    it('calls handleDelete when button is clicked', () => {
        const handleDelete = jest.fn();
        const wrapper = shallow(<Todo
            handleDelete={handleDelete}
            handleComplete={() => {}}
            sortByDateAndCompleted={() => {}}
            addTodoTag={() => {}}
            handleDeleteTodoTag={() => {}}
            todo={{id: '123456', title: 'test', completed: false, createdDate: new Date(1900, 1, 1)}} />);

        wrapper.find('Button').simulate('click');

        expect(handleDelete).toBeCalledWith('123456');
    });
});