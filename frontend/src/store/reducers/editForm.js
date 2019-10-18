import {
    ADD_CHANGE,
    TOGGLE_COLOR_PICKER,
    COLOR_CHANGE_COMPLETE,
    CLEAR_CHANGES,
    ADDBOX_BEGIN, 
    ADDBOX_SUCCESS,
    ADDBOX_FAIL 
} from "../constants";

const initialState = {
    box: {
        receiver: '',
        weight: '',
        color: {
            rgb: '',
            hex: '',
        },
        destination: '',
    },

    ui: {
        isColorPickerVisible: false,
    },

    errors: {
        receiver: '',
        weight: '',
        color: '',
        destination: '',
        generic: '',
    },

    success: '',

    loading: false,
}

export function editFormReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_CHANGE: {
            const newBox = { ...state.box };
            newBox[action.fieldName] = action.fieldValue;

            return {
                ...state,
                box: newBox,
                success: '',
            }
        }

        case TOGGLE_COLOR_PICKER:
            const newUi = { ...state.ui };
            newUi.isColorPickerVisible = !state.ui.isColorPickerVisible;

            return {
                ...state,
                ui: newUi,
            }

        case COLOR_CHANGE_COMPLETE: {
            const newBox = { ...state.box };
            newBox.color = {
                rgb: `${action.color.rgb.r}, ${action.color.rgb.g}, ${action.color.rgb.b}`,
                hex: action.color.hex,
            }

            return {
                ...state,
                box: newBox,
            }
        }

        case CLEAR_CHANGES: {
            let success = state.success;
            
            return {
                ...initialState,
                success: success,
            };
        }

        case ADDBOX_BEGIN:
                return {
                    ...state,
                    success: '',
                    loading: true,
                };
    
            case ADDBOX_SUCCESS:
                return {
                    ...state,
                    success: action.success,
                    errors: {},
                    loading: false,
                };
    
            case ADDBOX_FAIL:
                const newErrors = { ...state.errors, ...action.error.errors };
    
                return {
                    ...state,
                    errors: newErrors,
                    loading: false,
                };

        default:
            return state;
    }

}