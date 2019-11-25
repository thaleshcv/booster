import React from 'react';
import Typography from '@material-ui/core/Typography';
import { red, yellow, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = color =>
	makeStyles(theme => ({
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: color,
			borderRadius: '50%',
			minWidth: 64,
			minHeight: 64
		},
		value: {
			fontSize: '2rem',
			fontWeight: theme.typography.fontWeightBold
		}
	}));

function VoteAverage({ value }) {
	let color;
	if (value <= 3) {
		color = red['500'];
	} else if (value <= 7) {
		color = yellow['500'];
	} else {
		color = green['500'];
	}

	const classes = useStyles(color)();

	return (
		<span className={classes.root}>
			<Typography className={classes.value}>{value}</Typography>
		</span>
	);
}

export default VoteAverage;
