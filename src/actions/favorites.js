import { useRef } from 'react';
import { actions } from '../reducer';

export default function useFavorites(dispatch) {
	const ref = useRef({
		addFavorites: function(favorites) {
			dispatch({
				type: actions.ADD_FAVORITES,
				payload: favorites
			});
			return favorites;
		},

		removeFavorite: function(favoriteId) {
			dispatch({
				type: actions.REMOVE_FAVORITE,
				payload: favoriteId
			});
			return favoriteId;
		},

		updateFavorite: function(favorite) {
			dispatch({
				type: actions.UPDATE_FAVORITE,
				payload: favorite
			});
			return favorite;
		}
	});

	return ref.current;
}
