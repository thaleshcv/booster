import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	progress: {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		display: 'none',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999999999
	},
	inner: {
		width: '240px',
		height: '240px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'rgba(150,150,150,0.5)',
		borderRadius: '10%'
	}
});

function LoadingSpinner({ active, message }) {
	const classes = useStyles();

	return (
		<div
			className={classes.progress}
			style={{
				display: active ? 'flex' : 'none'
			}}>
			<div className={classes.inner}>
				<CircularProgress />
				<Typography variant='body1'>{message}</Typography>
			</div>
		</div>
	);
}

export default LoadingSpinner;
