import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { actions } from '../reducer';

const useStyles = makeStyles(theme => ({
	container: {
		paddingBottom: theme.spacing(1)
	},
	spacer: {
		margin: theme.spacing(2, 0)
	},
	input: {
		margin: theme.spacing(1, 0)
	}
}));

function Account({ dispatch, currentUser }) {
	const classes = useStyles();

	const handleDeleteAccount = () => {
		dispatch({
			type: actions.RESET_DATA
		});
	};

	return (
		<Container className={classes.container} maxWidth='md'>
			<Typography variant='h2' gutterBottom>
				Account
			</Typography>
			<Grid justify='space-between' alignItems='center' container>
				<Grid item>
					<Typography variant='body1'>{currentUser.email}</Typography>
				</Grid>
				<Grid item>
					<Button>Reset password</Button>
					<Button onClick={handleDeleteAccount} color='secondary'>
						Delete account
					</Button>
				</Grid>
			</Grid>
			<div className={classes.spacer}>
				<TextField
					id='account_name'
					label='Display Name'
					variant='filled'
					className={classes.input}
					fullWidth
				/>
				<Button>Save Display Name</Button>
			</div>
		</Container>
	);
}

export default Account;
