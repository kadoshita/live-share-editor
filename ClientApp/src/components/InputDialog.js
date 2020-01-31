import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const InputDialog = props => {
    return (
        <Dialog open={props.show} fullWidth>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <TextField multiline fullWidth rows={props.rowCount} label={props.label} defaultValue={props.defaultValue} onChange={e => props.onChangeInput(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.togglOpen(false, false)}>{props.cancelButtonTitle}</Button>
                <Button onClick={() => props.togglOpen(false, true)}>{props.okButtonTitle}</Button>
            </DialogActions>
        </Dialog>
    )
};
InputDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    onChangeInput: PropTypes.func.isRequired,
    togglOpen: PropTypes.func.isRequired,
    okButtonTitle: PropTypes.string.isRequired,
    cancelButtonTitle: PropTypes.string,
    rowCount: PropTypes.number.isRequired
};
export default InputDialog;