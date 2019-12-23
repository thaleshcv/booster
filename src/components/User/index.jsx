import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ConfirmPasswordDialog from './ConfirmPasswordDialog';
import UserAvatar from './UserAvatar';
import { resetPassword } from '../../lib/auth';
import { deleteUser, updateProfile, reauthenticate } from '../../lib/user';
import { uploadFile, deleteFile } from '../../lib/storage';

import useApp from '../../actions/app';
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
	const { setLoading, resetData } = useApp(dispatch);
	const { addFlashMessage } = useFlash(dispatch);
	const [avatarFile, setAvatarFile] = useState(null);
	const [dialogError, setDialogError] = useState();
	const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

	const [profile, setProfile] = useState({
		photoURL: currentUser.photoURL || '',
		displayName: currentUser.displayName || ''
	});

	const handleOpenPasswordDialog = () => {
		setPasswordDialogOpen(true);
	};

	const handleDeleteAccount = password => {
		return reauthenticate(currentUser.email, password)
			.then(() => {
				setLoading(true);

				deleteUser()
					.then(() => resetData())
					.catch(err => addFlashMessage(err.message))
					.finally(() => setLoading(false));
			})
			.catch(err => setDialogError(err.message));
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

		setLoading(true);

		if (!avatarFile) {
			sendProfile(profile).finally(() => setLoading(false));
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
				}).finally(() => setLoading(false))
			);
	};

	const uploadAvatar = file => {
		return uploadFile(file, { path: `avatars/${currentUser.uid}` });
	};

	const sendProfile = profile => {
		// using location.reload() as workaround to force reload the updated user
		return updateProfile(profile)
			.then(() => window.location.reload())
			.catch(() => addFlashMessage('Error updating profile.'));
	};

	return (
		<Container className={classes.container} maxWidth='md'>
			<ConfirmPasswordDialog
				error={dialogError}
				text='This action will delete your account and cannot be undone. Please,
				confirm your password to proceed.'
				open={passwordDialogOpen}
				onClose={() => setPasswordDialogOpen(false)}
				onProceed={handleDeleteAccount}
			/>
			<Typography variant='h2' gutterBottom>
				Account
			</Typography>
			<Grid justify='space-between' alignItems='center' container>
				<Grid item>
					<Typography variant='body1'>{currentUser.email}</Typography>
				</Grid>
				<Grid item>
					<Button onClick={handleOpenPasswordDialog} color='secondary'>
						Delete account
					</Button>
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
						{avatarFile && (
							<Typography variant='caption'>
								[ {avatarFile.name}, {avatarFile.size / 1000}Kb ]
							</Typography>
						)}
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
