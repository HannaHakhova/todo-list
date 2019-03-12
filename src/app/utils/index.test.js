/* eslint-disable react/jsx-filename-extension */

import {getFormattedDate, getDateNow, getApiDate} from 'utils';

test('getFormattedDate  retuns formatted date', () => {
    expect(getFormattedDate('0/1/2018')).toEqual(new Date('1/1/2018'));
});

test('getDateNow retuns new date', () => {
    expect(getDateNow().getMinutes()).toEqual(new Date().getMinutes());
});

test('getApiDate retuns date for api (months from 0)', () => {
    expect(getApiDate(new Date(2018, 0, 1))).toEqual('0/1/2018');
});