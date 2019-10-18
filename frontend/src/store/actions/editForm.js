import {
    ADD_CHANGE,
    TOGGLE_COLOR_PICKER,
    COLOR_CHANGE_COMPLETE,
    CLEAR_CHANGES,
    ADDBOX_BEGIN, 
    ADDBOX_SUCCESS,
    ADDBOX_FAIL
} from "../constants";

import { updateBoxesList } from './fetchBoxes';

export const addChange = (fieldName, fieldValue) => ({
    type: ADD_CHANGE,
    fieldName,
    fieldValue
});

export const toggleColorPicker = () => ({
    type: TOGGLE_COLOR_PICKER,
});

export const colorChangeComplete = (color) => ({
    type: COLOR_CHANGE_COMPLETE,
    color,
});

export const clearChanges = () => ({
    type: CLEAR_CHANGES,
});

const addBoxBegin = () => ({
    type: ADDBOX_BEGIN,
})

const addBoxSuccess = msg => ({
    type: ADDBOX_SUCCESS,
    success: msg,
})

const addBoxFail = error => ({
    type: ADDBOX_FAIL,
    error: error,
})

function postBox(formValues) {
    return fetch('http://localhost:8077/boxes', {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(handleErrors)
        .then(res => res.json())
}

export function addBox() {
    return (dispatch, getState) => {
        dispatch(addBoxBegin());
        return postBox(getFormData(getState()))
            .then(json => {
                if (json) {
                    dispatch(addBoxSuccess('Box is added to shipment registry'));
                    dispatch(updateBoxesList(json));
                    dispatch(clearChanges());
                    return json;
                } else {
                    const errorObj = { errors: { generic: "Box has not been saved." } }
                    dispatch(addBoxFail(errorObj))
                }
            })
            .catch(error => {
                if (error instanceof Error) {

                    const errorObj = { errors: { generic: error.message } };
                    dispatch(addBoxFail(errorObj));
                } else {
                    error.json().then((error) => {
                        dispatch(addBoxFail(error));
                    });    
                }
            });
    };
}

//fetches box from state and modifies color payload to 
//match server request  
const getFormData = state => ({
    ...state.form.box,
    color: state.form.box.color.hex,
});


function handleErrors(response) {
    if (response.ok) {
        return response;
    }

    throw response;
}