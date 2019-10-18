import React from 'react';

export const ColorInput = props => {
    return (
    
    <div className="form-group">
        <input className="form-input" 
        name={props.name} 
        type="text"
        value={props.value} 
        onFocus={props.onFocus}
        onChange={props.handleChange} 
        placeholder={props.placeholder} 
        //workaround: disable autocomplete as it covers the color Picker
        autoComplete="off"
        />
        
        {props.error && <span className="invalid-input">{props.error}</span>}
    </div>
    );
};

