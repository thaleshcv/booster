import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	error: {
		color: red[500]
	}
});

function ConfirmPasswordDialog({ open, onClose, onProceed, error, text }) {
	const inputRef = useRef();
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>Password confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
				{error && (
					<DialogContentText className={classes.error}>
						{error}
					</DialogContentText>
				)}
				<TextField
					id='password'
					margin='dense'
					label='Password'
					type='password'
					inputRef={inputRef}
					fullWidth
					autoFocus
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Cancel
				</Button>
				<Button
					onClick={() => onProceed(inputRef.current.value)}
					color='secondary'>
					Proceed
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmPasswordDialog;
