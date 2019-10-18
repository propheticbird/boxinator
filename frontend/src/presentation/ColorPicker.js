import React from 'react';

import { CompactPicker } from 'react-color';

export const ColorPicker = props => {
    return props.isColorPickerVisible &&
        <CompactPicker className=".color-picker"
            color={props.value || false}
            value={props.value}
            onChangeComplete={props.handleChange}
        />;
};
