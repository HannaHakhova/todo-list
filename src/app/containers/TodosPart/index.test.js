/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow} from 'enzyme';
import TodosPart from './index';

jest.mock('api', () => ({
    getAllData: () => new Promise(resolve => {
        const response = {
            data: [
                {
                    id: '94f3ab7b-f256-4d40-8f98-d6a7c625d816',
                    title: 'Berkshire',
                    completed: true,
                    createdDate: '6/12/2017'
                },
                {
                    id: 'b6fadd6b-2977-4797-8773-ba61da28311b',
                    title: 'Administrator',
                    completed: true,
                    createdDate: '5/12/2017'
                }
            ]
        };
        resolve(response);
    }),
    createData: () => {},
    deleteData: () => {},
    updateData: () => {}
}));

jest.mock('utils', () => ({
    getFormattedDate: () => new Date('Thu Apr 19 2018 12:18:16 GMT+0300 (FLE Daylight Time)'),
    getDate: () => {},
    getApiDate: () => {}
}));

describe('TodosPart', () => {
    it('matches expected snapshot', () => {
        const wrapper = shallow(<TodosPart />);
        expect(wrapper).toMatchSnapshot();
    });

    it('matches expected state ', done => {
        const wrapper = shallow(<TodosPart />);
        const todos = [
            {
                id: '94f3ab7b-f256-4d40-8f98-d6a7c625d816',
                title: 'Berkshire',
                completed: true,
                createdDate: new Date('Thu Apr 19 2018 12:18:16 GMT+0300 (FLE Daylight Time)')
            },
            {
                id: 'b6fadd6b-2977-4797-8773-ba61da28311b',
                title: 'Administrator',
                completed: true,
                createdDate: new Date('Thu Apr 19 2018 12:18:16 GMT+0300 (FLE Daylight Time)')
            }];

        setTimeout(() => {
            expect(wrapper.state().todos).toEqual(todos);
            done();
        }, 100);
    });
});