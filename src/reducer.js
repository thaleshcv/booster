export const actions = {
	ADD_FAVORITES: 'ADD_FAVORITES',
	REMOVE_FAVORITE: 'REMOVE_FAVORITE',
	ADD_FLASH_MESSAGE: 'ADD_FLASH_MESSAGE',
	SHIFT_FLASH_MESSAGE: 'SHIFT_FLASH_MESSAGE'
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_FAVORITES: {
			return {
				...state,
				favorites: state.favorites.concat(action.payload)
			};
		}
		case actions.REMOVE_FAVORITE: {
			return {
				...state,
				favorites: state.favorites.filter(f => f.id !== action.payload)
			};
		}
		case actions.ADD_FLASH_MESSAGE: {
			const flashes = [...state.flashes, action.payload];

			return {
				...state,
				flashes
			};
		}
		case actions.SHIFT_FLASH_MESSAGE: {
			const flashes = [].concat(state.flashes);
			flashes.shift();

			return {
				...state,
				flashes
			};
		}
		default:
			return state;
	}
}

export default function(state, action) {
	const actions = [].concat(action);
	return actions.reduce(reducer, state);
}
