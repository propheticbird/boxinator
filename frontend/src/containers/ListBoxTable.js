import React from 'react';

import { connect } from 'react-redux';

import { fetchBoxes } from '../store/actions/fetchBoxes';

import { ShippingSummary } from '../presentation/ShippingSummary';
import { TableHeader } from '../presentation/TableHeader';
import { TableData } from '../presentation/TableData';

import './ListBoxTable.scss'

class ListBoxTable extends React.Component {
    componentDidMount() {
        this.props.onFetchBoxes();
    }
    render() {
        const header = ['receiver', 'weight', 'color', 'shippingCost'];
        const { boxes, loading, error } = this.props;

        const summaryReducer = (prev, cur) =>
            ({ weight: prev.weight + cur.weight, shippingCost: prev.shippingCost + cur.shippingCost });
        const summary = boxes.reduce(summaryReducer, { weight: 0, shippingCost: 0 })


        if (loading) {
            return (
                <div className="show-boxes-layout">
                    <span className="spinner">Fetching data...</span>
                </div>
            )
        } else if (error) {
            return (
                <div className="show-boxes-layout">
                    <h2 className="title">Shipment summary</h2>
                    <Error error={error} />
                </div>
            )        
        } else {
            return (
                <div className="show-boxes-layout">
                    <h2 className="title">Shipment summary</h2>
                    <Table header={header} boxes={boxes} />
                    <Error error={error} />
                    <ShippingSummary total={{ ...summary }} />
                </div>
            )
        }
    }
}

const Error = props => {
    return (props.error !== null) && <span className="generic-message">Could not fetch shipment data: {props.error} </span>;
}

const Table = props => {
    if (props.boxes.length === 0) {
        return (
            <span className="table-no-data">There hasn't been any shipment yet.</span>
        )
    } else {
        return (
            <table className="boxes">
                <tbody>
                    <tr><TableHeader header={props.header} /></tr>
                    <TableData boxes={props.boxes} />
                </tbody>
            </table>);

    }
}

const mapStateToProps = (state) => ({
    boxes: state.list.boxes,
    loading: state.list.loading,
    error: state.list.error,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchBoxes: () => dispatch(fetchBoxes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBoxTable);
