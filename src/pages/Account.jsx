import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { actions } from '../reducer';

function Account({ dispatch, currentUser }) {
	const handleDeleteAccount = () => {
		dispatch({
			type: actions.RESET_DATA
		});
	};

	return (
		<Container maxWidth='md'>
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
		</Container>
	);
}

export default Account;
