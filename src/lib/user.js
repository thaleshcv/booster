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

	return firebase
		.auth()
		.currentUser.updateProfile({
			displayName,
			photoURL
		})
		.then(() => firebase.auth().currentUser.reload());
}

export function deleteUser() {
	if (!firebase.auth().currentUser) {
		throw new Error('Authentication required.');
	}

	return firebase.auth().currentUser.delete();
}

export function reauthenticate(email, password) {
	const credential = firebase.auth.EmailAuthProvider.credential(
		email,
		password
	);

	return firebase.auth().currentUser.reauthenticateWithCredential(credential);
}
