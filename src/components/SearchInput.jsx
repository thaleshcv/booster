import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
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

function SearchInput({
	className,
	inputProps,
	value,
	onChange,
	onClear,
	...props
}) {
	const classes = useStyles();
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
			className={[classes.root, className].join(' ')}
			inputProps={{
				className: [classes.input, inputProps].join(' ')
			}}
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
