import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import * as actions from './fetchBoxes'
import * as types from '../constants'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)


describe('test updating the list of boxes when user adds a new box', () => {
    it('should add a new box to a list of boxes', () => {
        const box = {
            receiver: 'John',
        };


        const expectedAction = {
            type: types.UPDATE_BOXES_LIST,
            box: box,
        };

        expect(actions.updateBoxesList(box)).toEqual(expectedAction);
    })
})

describe('test fetching boxes from server', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('successfully sends request to fetch boxes', () => {
        const response = [
            {
                receiver: 'John',
                weight: 22.3,
            },
            {
                receiver: 'Jake',
                weight: 12.0,
            },
        ];

        const store = mockStore({
            list: {
                boxes: [],
            }
        });

        const expectedActions = [
            { type: types.FETCH_BOXES_BEGIN },
            { type: types.FETCH_BOXES_SUCCESS, boxes: response },
        ]

        fetchMock.getOnce('http://localhost:8077/boxes', { status: 200, body: response });
        return store.dispatch(actions.fetchBoxes()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it('error is propagated when fetch fails', () => {
        const error = { error: 'error message' };

        const store = mockStore({
            list: {
                boxes: [],
            }
        });

        const expectedActions = [
            { type: types.FETCH_BOXES_BEGIN },
            { type: types.FETCH_BOXES_FAIL, error: error },
        ]

        fetchMock.getOnce('http://localhost:8077/boxes', { status: 400, body: error });

        return store.dispatch(actions.fetchBoxes()).then(res => res.json()).catch((e) => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});