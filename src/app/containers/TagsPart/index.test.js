/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow} from 'enzyme';
import TagsPart from './index';

jest.mock('api', () => ({
    getAllData: () => new Promise(resolve => {
        const response = {
            data: [
                {
                    id: '94f3ab7b-f256-4d40-8f98-d6a7c625d816',
                    title: 'Berkshire'
                },
                {
                    id: 'b6fadd6b-2977-4797-8773-ba61da28311b',
                    title: 'Administrator'
                }
            ]
        };
        resolve(response);
    }),
    createData: () => {},
    deleteData: () => {},
    updateData: () => {}
}));

describe('TagsPart', () => {
    it('matches expected snapshot', () => {
        const wrapper = shallow(<TagsPart />);
        expect(wrapper).toMatchSnapshot();
    });

    it('matches expected state ', done => {
        const wrapper = shallow(<TagsPart />);
        const tags = [
            {
                id: '94f3ab7b-f256-4d40-8f98-d6a7c625d816',
                title: 'Berkshire'
            },
            {
                id: 'b6fadd6b-2977-4797-8773-ba61da28311b',
                title: 'Administrator'
            }];

        setTimeout(() => {
            expect(wrapper.state().tags).toEqual(tags);
            done();
        }, 100);
    });
});