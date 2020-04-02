import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const MarkdownPreviewDialog = props => {
    return (
        <Dialog open={props.show} fullWidth>
            <DialogTitle>Markdown Preview</DialogTitle>
            <DialogContent>
                <TextField multiline fullWidth defaultValue={props.code}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.togglOpen()}>OK</Button>
            </DialogActions>
        </Dialog>
    )
};
MarkdownPreviewDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    togglOpen: PropTypes.func.isRequired
};
export default MarkdownPreviewDialog;