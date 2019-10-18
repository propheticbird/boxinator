import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { editFormReducer } from './reducers/editForm';
import { boxListReducer } from './reducers/boxList';

export default function configureStore() {
    const reducers = combineReducers(
        {
            form: editFormReducer,
            list: boxListReducer,
        }
    );

    return createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

