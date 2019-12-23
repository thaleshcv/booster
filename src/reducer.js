export const actions = {
	SET_LOADING: 'SET_LOADING',
	RESET_DATA: 'RESET_DATA',
	ADD_FAVORITES: 'ADD_FAVORITES',
	REMOVE_FAVORITE: 'REMOVE_FAVORITE',
	UPDATE_FAVORITE: 'UPDATE_FAVORITE',
	ADD_FLASH_MESSAGE: 'ADD_FLASH_MESSAGE',
	SHIFT_FLASH_MESSAGE: 'SHIFT_FLASH_MESSAGE'
};

const initialState = {
	loading: false,
	favorites: [],
	flashes: []
};

function reducer(state, action) {
	switch (action.type) {
		case actions.SET_LOADING: {
			return {
				...state,
				loading: action.payload
			};
		}
		case actions.RESET_DATA: {
			return initialState;
		}
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
		case actions.UPDATE_FAVORITE: {
			const idx = state.favorites.findIndex(f => f.id === action.payload.id);
			if (idx < 0) {
				return state;
			}

			const favorites = [].concat(state.favorites);
			favorites[idx] = {
				...favorites[idx],
				...action.payload
			};

			return {
				...state,
				favorites
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
