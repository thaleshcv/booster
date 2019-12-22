import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// dialog imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { red } from '@material-ui/core/colors';
// end of dialog imports

import UserAvatar from './UserAvatar';

import { resetPassword } from '../../lib/auth';
import { deleteUser, updateProfile, reauthenticate } from '../../lib/user';
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

const useDialogStyles = makeStyles(theme => ({
	text: {
		padding: theme.spacing(1),
		color: red[500]
	}
}));

function ConfirmPasswordDialog({ open, onClose, onProceed }) {
	const classes = useDialogStyles();
	const inputRef = useRef();

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>Password confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText className={classes.text}>
					This action will delete your account and cannot be undone. Please,
					confirm your password to proceed.
				</DialogContentText>
				<TextField
					id='password'
					margin='dense'
					label='Password'
					type='password'
					inputRef={inputRef}
					fullWidth
					autoFocus
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Cancel
				</Button>
				<Button
					onClick={() => onProceed(inputRef.current.value)}
					color='secondary'>
					Proceed
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function Account({ dispatch, currentUser }) {
	const classes = useStyles();
	const { addFlashMessage } = useFlash(dispatch);
	const [avatarFile, setAvatarFile] = useState(null);
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
				deleteUser()
					.then(() => {
						dispatch({
							type: actions.RESET_DATA
						});
					})
					.catch(err => addFlashMessage(err.message));
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
			<ConfirmPasswordDialog
				open={passwordDialogOpen}
				onClose={() => setPasswordDialogOpen(false)}
				onProceed={handleDeleteAccount}
			/>
			<Typography variant='h2' gutterBottom>
				Account
			</Typography>
			<Typography variant='body1'>{currentUser.email}</Typography>
			<Grid alignItems='center' container>
				<Grid item>
					<Button onClick={handleOpenPasswordDialog} color='secondary'>
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
