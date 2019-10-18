import React from 'react';

import BoxColor from '../presentation/BoxColor';

export const TableData = props => {
    return props.boxes.map((box, index) => {
        
        const { receiver, weight, color, shippingCost } = box
        
        return (
            <tr key={index}>
                <td>{receiver}</td>
                <td>{weight} kilograms</td>
                <BoxColor color={color} />
                <td>{shippingCost} SEK</td>
            </tr>
        )
    })
}