import React from 'react';

export const ShippingSummary = props => {

    return (    
        <div className="summary">
            <span> Total weight: {props.total.weight} kilograms</span> | 
            <span> Total cost: {props.total.shippingCost} SEK</span>
        </div>
    )
}