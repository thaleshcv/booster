import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	close: {
		padding: theme.spacing(0.5)
	}
}));

function Flash({ children, open, onClose, className, style }) {
	const classes = useStyles();

	return (
		<Snackbar
			className={className}
			style={style}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={open}
			autoHideDuration={6000}
			onClose={onClose}
			ContentProps={{
				'aria-describedby': 'flash-content-id'
			}}
			message={<span id='flash-content-id'>{children}</span>}
			action={[
				<IconButton
					key='close'
					aria-label='close'
					color='inherit'
					className={classes.close}
					onClick={onClose}>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
}

export default Flash;
