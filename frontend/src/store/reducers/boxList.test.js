import { boxListReducer } from './boxList';
import * as types from '../constants';
import expect from 'expect';

describe('boxList reducer', () => {
    it('should return the initial state', () => {
        expect(
            boxListReducer(undefined, {})
        ).toEqual({
            boxes: [],
            loading: false,
            error: null,
        });
    });

    it('should handle FETCHBOXES_BEGIN', () => {
        expect(
            boxListReducer({ boxes: [{ receiver: "John" }, { receiver: "Jake" }] }, {
                type: types.FETCH_BOXES_BEGIN,
            })).toEqual({
                loading: true,
                error: null,
                boxes: [{ receiver: "John" }, { receiver: "Jake" }],
            });
    });

    it('should handle FETCHBOXES_SUCCESS', () => {
        expect(
            boxListReducer({ boxes: [{ receiver: "Obi Wan" }] }, {
                type: types.FETCH_BOXES_SUCCESS,
                boxes: [{ receiver: "John" }, { receiver: "Jake" }],
            })).toEqual({
                loading: false,
                error: null,
                boxes: [{ receiver: "John" }, { receiver: "Jake" }],
            });
    });

    it('should handle FETCHBOXES_FAIL', () => {
        expect(
            boxListReducer({ boxes: [{ receiver: "Obi Wan" }] }, {
                type: types.FETCH_BOXES_FAIL,
                error: "Error message",
            })).toEqual({
                loading: false,
                error: "Error message",
                boxes: [{ receiver: "Obi Wan" }],
            });
    });

    it('should handle UPDATE_BOXES_LIST', () => {
        expect(
            boxListReducer({ boxes: [{ receiver: "Obi Wan" }], error: '', loading: false }, {
                type: types.UPDATE_BOXES_LIST,
                box: { receiver: "Jabba" },
            })).toEqual({
                boxes: [{ receiver: "Obi Wan" }, { receiver: "Jabba" }],
                loading: false,
                error: '',
            });
    });
});
