import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import EnterIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	form: {
		display: 'inline-block'
	}
});

function SearchInput({ value, onSubmit }) {
	const classes = useStyles();
	const [inputValue, setInputValue] = useState(value || '');

	const handleInputChange = evt => {
		setInputValue(evt.target.value);
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		onSubmit(inputValue);
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<Input
				id='search-input'
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Search movies here...'
				endAdornment={
					<InputAdornment position='end'>
						<IconButton type='submit'>
							<EnterIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</form>
	);
}

export default SearchInput;
