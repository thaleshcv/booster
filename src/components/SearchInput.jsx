import React from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		padding: theme.spacing(1, 2),
		'&:before': {
			borderBottom: '1px solid rgba(255,255,255,0.3) !important'
		},
		'&:hover:before': {
			borderBottom: '1px solid white !important'
		}
	},
	input: {
		color: theme.palette.common.white
	}
}));

function SearchInput({ className, inputProps, ...props }) {
	const classes = useStyles();

	return (
		<Input
			id='search-input'
			placeholder='Search movies here...'
			className={[classes.root, className].join(' ')}
			inputProps={{
				className: [classes.input, inputProps].join(' ')
			}}
			{...props}
		/>
	);
}

export default SearchInput;
