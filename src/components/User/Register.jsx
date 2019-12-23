import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import UserForm from './UserForm';

import useApp from '../../actions/app';
import { createUser } from '../../lib/user';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 440,
		margin: 'auto',
		textAlign: 'center',
		padding: theme.spacing(2, 0)
	}
}));

function Register({ dispatch, redirectTo }) {
	const classes = useStyles();
	const [error, setError] = useState();
	const history = useHistory();

	const { setLoading } = useApp(dispatch);

	const handleSubmit = data => {
		setLoading(true);

		createUser(data)
			.then(() =>
				history.push({
					pathname: redirectTo
				})
			)
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	};

	return (
		<div className={classes.root}>
			<Typography variant='h2' gutterBottom>
				Welcome to booster
			</Typography>
			<Typography variant='body1' gutterBottom>
				Please, register to enter...
			</Typography>

			{error && <Typography color='error'>{error}</Typography>}
			<UserForm onSubmit={handleSubmit} />

			<Grid spacing={2} container>
				<Grid xs={12} item>
					<Typography variant='body1'>Already registered?</Typography>
					<Button variant='contained' component={RouterLink} to='/login'>
						Login here
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default Register;
