import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import UserAvatar from '../components/User/UserAvatar';
import { deleteUser, updateProfile } from '../lib/user';
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

	const [profile, setProfile] = useState({
		photoURL: currentUser.photoURL || '',
		displayName: currentUser.displayName || ''
	});

	const handleDeleteAccount = () => {
		window.confirm('This cannot be undone! Are you sure?') &&
			deleteUser()
				.then(() => {
					dispatch({
						type: actions.RESET_DATA
					});
				})
				.catch(err => {
					dispatch({
						type: actions.ADD_FLASH_MESSAGE,
						payload: err.message
					});
				});
	};

	const handleTextFieldChange = evt => {
		setProfile({
			...profile,
			[evt.target.name]: evt.target.value
		});
	};

	const handleUpdateProfile = evt => {
		evt.preventDefault();
		updateProfile(profile).then(payload => console.log(payload));
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

			<form onSubmit={handleUpdateProfile}>
				<Grid
					alignItems='center'
					spacing={1}
					className={classes.spacer}
					container>
					<Grid item>
						<UserAvatar
							src={currentUser.photoURL}
							name={currentUser.displayName}
							email={currentUser.email}
						/>
					</Grid>
					<Grid item>
						<Button size='small'>Set avatar</Button>
						{currentUser.photoURL && (
							<Button size='small'>Remove avatar</Button>
						)}
					</Grid>
				</Grid>
				<TextField
					id='account_name'
					label='Display Name'
					value={profile.displayName}
					name='displayName'
					onChange={handleTextFieldChange}
					className={classes.input}
					fullWidth
				/>
				<Button type='submit'>Update</Button>
			</form>
		</Container>
	);
}

export default Account;
