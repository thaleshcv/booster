import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import UserAvatar from '../User/UserAvatar';

import { resetPassword } from '../../lib/auth';
import { deleteUser, updateProfile } from '../../lib/user';
import { uploadFile, deleteFile } from '../../lib/storage';

import { actions } from '../../reducer';
import useFlash from '../../actions/flash';

const useStyles = makeStyles(theme => ({
	container: {
		paddingBottom: theme.spacing(1)
	},
	spacer: {
		margin: theme.spacing(2, 0)
	},
	input: {
		margin: theme.spacing(1, 0)
	},
	avatarInput: {
		display: 'none'
	}
}));

function Account({ dispatch, currentUser }) {
	const classes = useStyles();
	const [avatarFile, setAvatarFile] = useState(null);
	const { addFlashMessage } = useFlash(dispatch);

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
				.catch(err => addFlashMessage(err.message));
	};

	const handleResetPassword = () => {
		return resetPassword(currentUser.email)
			.then(() =>
				addFlashMessage(
					'A message was sent to your email with instructions to reset your password.'
				)
			)
			.catch(err => addFlashMessage(err.message));
	};

	const handleTextFieldChange = evt => {
		setProfile({
			...profile,
			[evt.target.name]: evt.target.value
		});
	};

	const handleFileFieldChange = evt => {
		const file = evt.target.files[0];

		if (!file.type.match(/image\/(jpeg|png)/)) {
			evt.target.value = null;

			setAvatarFile(null);
			addFlashMessage('File type not supported.');

			return;
		}

		setAvatarFile(file);
	};

	const handleClearAvatar = () => {
		deleteFile(`avatars/${currentUser.uid}`)
			.then(() =>
				sendProfile({
					photoURL: null
				})
			)
			.catch(() => {
				addFlashMessage('Error deleting avatar.');
			});
	};

	const handleSubmitProfile = evt => {
		evt.preventDefault();

		if (!avatarFile) {
			sendProfile(profile);
			return;
		}

		uploadAvatar(avatarFile)
			.then(snapshot =>
				snapshot.ref.getDownloadURL().then(downloadURL => downloadURL)
			)
			.then(photoURL =>
				sendProfile({
					...profile,
					photoURL
				})
			);
	};

	const uploadAvatar = file => {
		return uploadFile(file, { path: `avatars/${currentUser.uid}` });
	};

	const sendProfile = profile => {
		// using location.reload() to force reload the updated user
		return updateProfile(profile)
			.then(() => window.location.reload())
			.catch(() => addFlashMessage('Error updating profile.'));
	};

	return (
		<Container className={classes.container} maxWidth='md'>
			<Typography variant='h2' gutterBottom>
				Account
			</Typography>
			<Typography variant='body1'>{currentUser.email}</Typography>
			<Grid alignItems='center' container>
				<Grid item>
					<Button onClick={handleDeleteAccount} color='secondary'>
						Delete account
					</Button>
				</Grid>
				<Grid item>
					<Button onClick={handleResetPassword}>Reset password</Button>
				</Grid>
			</Grid>
			<form className={classes.spacer} onSubmit={handleSubmitProfile}>
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
						<input
							id='avatar_input'
							type='file'
							multiple={false}
							accept='image/*'
							name='avatarFile'
							className={classes.avatarInput}
							onChange={handleFileFieldChange}
						/>
						<label htmlFor='avatar_input'>
							<Button component='span' size='small'>
								Set avatar
							</Button>
						</label>
						{currentUser.photoURL && (
							<Button onClick={handleClearAvatar} size='small'>
								Remove avatar
							</Button>
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
				<Button type='submit'>Update Profile</Button>
			</form>
		</Container>
	);
}

export default Account;
