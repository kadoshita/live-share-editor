import React from 'react';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const MarkdownPreviewDialog = props => {
    return (
        <Dialog open={props.show} fullWidth>
            <DialogTitle>Markdown Preview</DialogTitle>
            <DialogContent>
                <div>
                    {
                        unified().use(parse).use(remark2react).processSync(props.code).result
                    }
                </div>
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