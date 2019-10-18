import { FETCH_BOXES_BEGIN, FETCH_BOXES_SUCCESS, FETCH_BOXES_FAIL, UPDATE_BOXES_LIST } from "../constants";

const initialState = {
    boxes: [],
    loading: false,
    error: null,
};

export function boxListReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_BOXES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_BOXES_SUCCESS:
            return {
                ...state,
                loading: false,
                boxes: action.boxes,
                error: null,
            };

        case FETCH_BOXES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case UPDATE_BOXES_LIST:
            const newBoxes = [...state.boxes];
            newBoxes.push(action.box); 
        
            return {
                ...state,
                boxes: newBoxes,
            }

        default:
            return state;
    }
}