import React from 'react';

import { connect } from 'react-redux';

import { Button } from '../presentation/Button';
import { Select } from './../presentation/Select';
import { ColorInput } from './../presentation/ColorInput';
import { ColorPicker } from './../presentation/ColorPicker';
import { Input } from '../presentation/Input';

import {
    addBox,
    addChange,
    toggleColorPicker,
    colorChangeComplete
} from '../store/actions/editForm';

import './AddBoxForm.scss';

class AddBoxForm extends React.Component {
    
    //disables save button if any fields are empty
    isAnyFieldsEmpty(box) {
        return Object.values(box).some(field => field === '');
    }

    render() {
        const destinations = ['Sweden', 'Brazil', 'China', 'Australia'];
        const { onChange, onFocus, onColorChangeComplete, onSubmit } = this.props;
        const { box, errors, success, ui } = this.props;

        return (
            <div className="addBoxContainer">
                <h2>Register box for shipment</h2>

                <form className="form" onSubmit={this.handleFormSubmit}>

                    <Input type={'text'}
                        name={'receiver'}
                        value={box.receiver}
                        placeholder={'Receiver\'s name'}
                        handleChange={onChange}
                        error={errors.receiver}
                    />

                    <Input type={'number'}
                        name={'weight'}
                        value={box.weight}
                        placeholder={'Box weight'}
                        handleChange={onChange}
                        error={errors.weight}
                    />

                    <ColorInput
                        name={'color'}
                        value={box.color.rgb}
                        placeholder={'Choose color'}
                        onFocus={onFocus}
                        handleChange={onChange}
                        error={errors.color}
                    />

                    <ColorPicker
                        isColorPickerVisible={ui.isColorPickerVisible}
                        color={box.color.hex}
                        value={box.color.hex}
                        handleChange={onColorChangeComplete}
                    />

                    <Select
                        name={'destination'}
                        options={destinations}
                        value={box.destination}
                        placeholder={'Select destination'}
                        handleChange={onChange}
                        error={errors.destination}
                    />

                    <Button
                        action={onSubmit}
                        disabled={this.isAnyFieldsEmpty(box)}
                        title={'Submit'}
                    />
                </form>

                <p className="generic-message">{errors.generic || success}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    box: state.form.box,
    ui: state.form.ui,
    errors: state.form.errors,
    success: state.form.success,
    loading: state.form.loading,
});

const mapDispatchToProps = dispatch => ({
    onChange: (e) => dispatch(addChange(e.target.name, e.target.value)),
    onFocus: (e) => dispatch(toggleColorPicker()),
    onColorChangeComplete: (c, e) => { dispatch(colorChangeComplete(c)); dispatch(toggleColorPicker()) },
    onSubmit: (e) => {e.preventDefault(); dispatch(addBox()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoxForm);
