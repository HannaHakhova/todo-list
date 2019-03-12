/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {shallow} from 'enzyme';
import MainPage from './index';

describe('MainPage', () => {
    it('matches expected snapshot', () => {
        const wrapper = shallow(<MainPage />);
        expect(wrapper).toMatchSnapshot();
    });
});