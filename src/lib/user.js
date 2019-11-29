import firebase from 'firebase/app';
import 'firebase/auth';

export function createUser(data) {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(data.email, data.password)
		.then(({ user }) => user.toJSON());
}
