export const actions = {
	ADD_FAVORITES: 'ADD_FAVORITES',
	REMOVE_FAVORITE: 'REMOVE_FAVORITE'
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_FAVORITES:
			return {
				...state,
				favorites: state.favorites.concat(action.payload)
			};
		case actions.REMOVE_FAVORITE:
			const favoritesAfterRemove = state.favorites.filter(
				fav => fav.id !== action.payload
			);

			return {
				...state,
				favorites: favoritesAfterRemove
			};
		default:
			return state;
	}
}

export default function(state, action) {
	const actions = [].concat(action);
	return actions.reduce(reducer, state);
}
