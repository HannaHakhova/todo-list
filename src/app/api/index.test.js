import mockAxios from 'jest-mock-axios';
import {createData, deleteData, updateData} from 'api';

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    mockAxios.patch = jest.fn(() => new Promise(() => { }));
});

it('createData should send post request', () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();
    const url = '/api/tasks';

    // using the component, which should make a server response
    const item = {id: 'vKGCA87pif09BAL8', title: 'sdv', completed: false, createdDate: '3/18/2018'};

    createData(url, item)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/tasks', item);

    // simulating a server response
    const responseObj = {
        id: 'vKGCA87pif09BAL8',
        title: 'sdv',
        completed: false,
        createdDate: '3/18/2018'
    };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith({completed: false, config: {}, createdDate: '3/18/2018', data: {}, headers: {}, id: 'vKGCA87pif09BAL8', status: 200, statusText: 'OK', title: 'sdv'});

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
});

it('deleteData should send delete request', () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();
    const url = '/api/tasks';

    // using the component, which should make a server response
    const id = 'vKGCA87pif09BAL8';

    deleteData(url, id)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.delete).toHaveBeenCalledWith(`/api/tasks/${id}`);

    // simulating a server response
    const responseObj = {};
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith({config: {}, data: {}, headers: {}, status: 200, statusText: 'OK'});

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
});

it('updateData should send patch request', () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();
    const url = '/api/tasks';

    // using the component, which should make a server response
    const id = 'vKGCA87pif09BAL8';
    const item = {completed: false};

    updateData(url, id, item)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.patch).toHaveBeenCalledWith(`/api/tasks/${id}`, item);
});