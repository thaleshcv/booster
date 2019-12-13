import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	form: {
		padding: theme.spacing(3, 0)
	},
	input: {
		margin: theme.spacing(2, 0)
	}
}));

function LoginForm({ onSubmit }) {
	const classes = useStyles();

	const [values, setValues] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = evt => {
		evt.preventDefault();
		onSubmit(values);
	};

	const handleChange = evt => {
		const { name, value } = evt.target;

		setValues({
			...values,
			[name]: value
		});
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<TextField
				className={classes.input}
				id='auth_email'
				type='email'
				name='email'
				value={values.email}
				label='Email'
				onChange={handleChange}
				autoFocus
				fullWidth
			/>
			<TextField
				className={classes.input}
				id='auth_password'
				type='password'
				name='password'
				value={values.password}
				label='Password'
				onChange={handleChange}
				fullWidth
			/>
			<Button type='submit' color='primary' variant='contained'>
				Login
			</Button>
		</form>
	);
}

export default LoginForm;
