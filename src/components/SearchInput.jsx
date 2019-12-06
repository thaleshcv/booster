import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';

function SearchInput({ inputProps, value, onChange, onClear, ...props }) {
	const [inputValue, setInputValue] = useState(value || '');

	const handleClear = () => {
		setInputValue('');
		if (onClear) {
			onClear();
		}
	};

	const handleInputChange = evt => {
		setInputValue(evt.target.value);
		if (onChange) {
			onChange(evt);
		}
	};

	return (
		<Input
			id='search-input'
			value={inputValue}
			onChange={handleInputChange}
			placeholder='Search movies here...'
			{...props}
			endAdornment={
				inputValue && (
					<InputAdornment position='end'>
						<IconButton onClick={handleClear}>
							<CloseIcon />
						</IconButton>
					</InputAdornment>
				)
			}
		/>
	);
}

export default SearchInput;
