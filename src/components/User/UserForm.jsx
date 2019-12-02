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

const validate = ({ email, password, passwordConfirmation }) => {
	const errors = {};
	if (!email) {
		errors['email'] = 'Email is required';
	}

	if (!password) {
		errors['password'] = 'Password is required';
	}

	if (!passwordConfirmation) {
		errors['passwordConfirmation'] = 'Password confirmation is required';
	}

	if (password !== passwordConfirmation) {
		errors['passwordConfirmation'] =
			'Confirmation does not match the password entered';
	}
	return errors;
};

function UserForm({ onSubmit }) {
	const classes = useStyles();

	const [values, setValues] = useState({
		email: '',
		password: '',
		passwordConfirmation: ''
	});

	const [errors, setErrors] = useState({});

	const handleSubmit = evt => {
		evt.preventDefault();

		const formErrors = validate(values);
		if (Object.entries(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

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
				id='user_email'
				type='email'
				name='email'
				value={values.email}
				label='Email'
				onChange={handleChange}
				helperText={errors.email}
				error={Boolean(errors.email)}
				autoFocus
				fullWidth
			/>
			<TextField
				className={classes.input}
				id='user_password'
				type='password'
				name='password'
				value={values.password}
				label='Password'
				onChange={handleChange}
				helperText={errors.password}
				error={Boolean(errors.password)}
				fullWidth
			/>
			<TextField
				className={classes.input}
				id='user_password_confirmation'
				type='password'
				name='passwordConfirmation'
				value={values.passwordConfirmation}
				label='Confirm your password'
				onChange={handleChange}
				helperText={errors.passwordConfirmation}
				error={Boolean(errors.passwordConfirmation)}
				fullWidth
			/>
			<Button type='submit' color='primary' variant='contained'>
				Register
			</Button>
		</form>
	);
}

export default UserForm;
