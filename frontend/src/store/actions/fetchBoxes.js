import { FETCH_BOXES_BEGIN, FETCH_BOXES_SUCCESS, FETCH_BOXES_FAIL, UPDATE_BOXES_LIST } from "../constants";

export function fetchBoxes() {
    return dispatch => {
        dispatch(fetchBoxesBegin());
        return makeRequest()
            .then(json => {
                dispatch(fetchBoxesSuccess(json));
                return json;
            })
            .catch(error => {
                if (error instanceof Error) {
                    dispatch(fetchBoxesFailure(error.message));
                } else {
                    error.json().then((error) => {
                        dispatch(fetchBoxesFailure(error));
                    });    
                }
            });
    };
}

function makeRequest() {
    return fetch("http://localhost:8077/boxes", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(handleErrors)
        .then(res => res.json());
}

function handleErrors(response) {
    if (response.ok) {
        return response;
    }

    throw response;
}

export const updateBoxesList = box => ({
    type: UPDATE_BOXES_LIST,
    box: box,
});


const fetchBoxesBegin = () => ({
    type: FETCH_BOXES_BEGIN
});

const fetchBoxesSuccess = boxes => ({
    type: FETCH_BOXES_SUCCESS,
    boxes: boxes,
});

const fetchBoxesFailure = error => ({
    type: FETCH_BOXES_FAIL,
    error: error,
});