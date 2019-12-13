import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import { authenticate } from '../../lib/auth';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 440,
		margin: 'auto',
		textAlign: 'center',
		padding: theme.spacing(2, 0)
	}
}));

function Login({ redirectTo }) {
	const classes = useStyles();
	const [error, setError] = useState();
	const history = useHistory();

	const handleSubmit = data => {
		return authenticate(data.email, data.password)
			.then(() => {
				history.push({
					pathname: redirectTo
				});
			})
			.catch(err => {
				setError(err.message);
			});
	};

	return (
		<div className={classes.root}>
			<Typography variant='h2' gutterBottom>
				Welcome to booster
			</Typography>
			<Typography variant='body1' gutterBottom>
				Please, login to enter...
			</Typography>

			{error && <Typography color='error'>{error}</Typography>}
			<LoginForm onSubmit={handleSubmit} />

			<Grid spacing={2} container>
				<Grid xs={12} item>
					<Typography variant='body1'>Don't have an account?</Typography>
					<Button variant='contained' component={RouterLink} to='/register'>
						Register here
					</Button>
				</Grid>
				<Grid xs={12} item>
					<Typography variant='body1'>Forgot your password?</Typography>
					<Button variant='contained' component={RouterLink} to='/login'>
						Request a new password
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default Login;
