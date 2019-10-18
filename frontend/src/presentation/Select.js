import React from 'react';

export const Select = props => {
    return <div className="form-group">
        <div className="select">
            
            <select className="select-text"
                name={props.name}
                value={props.value}
                onChange={props.handleChange} required>

                <option value="" disabled>{props.placeholder}</option>
                {props.options.map(option => {
                    return <option key={option} value={option} label={option}>{option}
                    </option>;
                })}
            </select>

            {props.error && <span className="invalid-input">{props.error}</span>}
        </div>
    </div>;
};