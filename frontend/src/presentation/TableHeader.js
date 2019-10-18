import React from 'react';

export const TableHeader = props => {
    return props.header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}