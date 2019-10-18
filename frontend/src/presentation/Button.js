import React from 'react';

export const Button = props => {
  return <button className="form-submit" disabled={props.disabled} onClick={props.action}>
            {props.title}
        </button>;
};
  