import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import * as actions from './editForm'
import * as types from '../constants'

describe('register change in form field', () => {
    it('should register a change for a form field', () => {
        const fieldName = 'receiver';
        const fieldValue = 'John';


        const expectedAction = {
            type: types.ADD_CHANGE,
            fieldName,
            fieldValue
        };

        expect(actions.addChange(fieldName, fieldValue)).toEqual(expectedAction);
    })
})

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('async form actions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('sends form data to server and dispatches ADDBOX_SUCCESS', () => {
        const response = {
            receiver: 'John'
        };

        const store = mockStore({
            form: {
                box: {
                    receiver: "John",
                    weight: 33.3,
                    destination: "Sweden",
                    color: "#ffffff",
                }
            }
        });

        const successMsg = 'Box is added to shipment registry';
        const expectedActions = [
            { type: types.ADDBOX_BEGIN },
            { type: types.ADDBOX_SUCCESS, success: successMsg },
            { type: types.UPDATE_BOXES_LIST, box: response},
            { type: types.CLEAR_CHANGES }
        ]

        fetchMock.postOnce('http://localhost:8077/boxes', { body: response });
        return store.dispatch(actions.addBox()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it('dispatches ADDBOX_FAIL when fetch fails', () => {
        const error = { error: { generic: 'error message' } };

        const store = mockStore({
            form: {
                box: {
                    receiver: "John",
                    weight: 33.3,
                    destination: "Sweden",
                    color: "#ffffff",
                }
            }
        });

        const expectedActions = [
            { type: types.ADDBOX_BEGIN },
            { type: types.ADDBOX_FAIL, error: error },
        ]

        fetchMock.postOnce('http://localhost:8077/boxes', { status: 400, body: error });

        return store.dispatch(actions.addBox()).then(res => res.json()).catch((e) => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});