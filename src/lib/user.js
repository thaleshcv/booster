import firebase from 'firebase/app';
import 'firebase/auth';

export function createUser(data) {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(data.email, data.password)
		.then(({ user }) => user.toJSON());
}

export function updateProfile({ displayName, photoURL }) {
	if (!firebase.auth().currentUser) {
		throw new Error('Authentication required.');
	}

	const payload = {};
	if (displayName) {
		payload.displayName = displayName;
	}

	if (photoURL) {
		payload.photoURL = photoURL;
	}

	return firebase
		.auth()
		.currentUser.updateProfile(payload)
		.then(() => firebase.auth().currentUser.reload());
}

export function deleteUser() {
	if (!firebase.auth().currentUser) {
		throw new Error('Authentication required.');
	}

	return firebase.auth().currentUser.delete();
}
