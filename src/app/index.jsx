import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import root from 'lodash._root';
import MainPage from 'containers/MainPage';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';

// use applyMiddleware to add the thunk middleware to the store
const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <MainPage />
    </Provider>,
    root.document.getElementById('root')
);