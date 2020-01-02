import React from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const InputDialog = props => {
    return (
        <Dialog open={props.show} fullWidth>
            <DialogTitle>標準入力</DialogTitle>
            <DialogContent>
                <TextField multiline fullWidth rows={5} label='標準入力' defaultValue={props.stdin} onChange={e => props.setStdin(e.target.value)}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.togglOpen(false, false)}>キャンセル</Button>
                <Button onClick={() => props.togglOpen(false, true)}>実行</Button>
            </DialogActions>
        </Dialog>
    )
};

export default InputDialog;