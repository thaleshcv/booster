import React from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	wrapper: {
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

function SearchInput(props) {
	const classes = useStyles();

	return (
		<Input
			id='search-input'
			placeholder='Search movies here...'
			className={classes.wrapper}
			inputProps={{
				className: classes.input
			}}
			{...props}
		/>
	);
}

export default SearchInput;
