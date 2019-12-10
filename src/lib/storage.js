import firebase from 'firebase/app';
import 'firebase/storage';

export function uploadFile(file, options = {}) {
	const opts = {
		path: file.name,
		...options
	};

	return firebase
		.storage()
		.ref()
		.child(opts.path)
		.put(file);
}

export function deleteFile(path) {
	return firebase
		.storage()
		.ref()
		.child(path)
		.delete();
}
