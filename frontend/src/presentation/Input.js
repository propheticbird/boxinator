import React from 'react';

export const Input = props => {
  return <div className="form-group">
            <input 
                className="form-input" 
                name={props.name} 
                type={props.type} 
                value={props.value} 
                onChange={props.handleChange}
                placeholder={props.placeholder} 
            />
            {props.error && <span className="invalid-input">{props.error}</span>}
        </div>;
};
  