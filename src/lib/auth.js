import firebase from 'firebase/app';
import 'firebase/auth';

export function authenticate(email, password) {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(({ user }) => user.toJSON());
}

export function logoutUser() {
	return firebase.auth().signOut();
}

export function resetPassword(email) {
	return firebase.auth().sendPasswordResetEmail(email);
}
