import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

function buildFavorite({ id, title, poster_path, backdrop_path }) {
	return {
		title,
		movieId: id,
		posterPath: poster_path,
		backdropPath: backdrop_path
	};
}

export function createFavorite(movie) {
	if (!firebase.auth().currentUser) {
		throw new Error('This operation requires authentication.');
	}

	const timestamp = new Date().getTime();

	const favorite = {
		...buildFavorite(movie),
		userId: firebase.auth().currentUser.uid,
		createdAt: timestamp,
		updatedAt: timestamp
	};

	return firebase
		.firestore()
		.collection('favorites')
		.add(favorite)
		.then(ref => {
			return {
				id: ref.id,
				...favorite
			};
		});
}

export function deleteFavorite(docId) {
	return firebase
		.firestore()
		.collection('favorites')
		.doc(docId)
		.delete();
}

export function getUserFavorites() {
	if (!firebase.auth().currentUser) {
		throw new Error('This operation requires authentication.');
	}

	return firebase
		.firestore()
		.collection('favorites')
		.where('userId', '==', firebase.auth().currentUser.uid)
		.get()
		.then(snapshot => {
			const results = [];
			snapshot.forEach(function(doc) {
				results.push({
					...doc.data(),
					id: doc.id
				});
			});

			return results;
		});
}

export function setFavoriteWatched(favoriteId, watched) {
	return firebase
		.firestore()
		.collection('favorites')
		.doc(favoriteId)
		.set({ watched }, { merge: true });
}
