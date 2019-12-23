import { useRef } from 'react';
import { actions } from '../reducer';

export default function useApp(dispatch) {
	const ref = useRef({
		setLoading: function(loading) {
			dispatch({
				type: actions.SET_LOADING,
				payload: Boolean(loading)
			});
		},

		resetData: function() {
			dispatch({
				type: actions.RESET_DATA
			});
		}
	});

	return ref.current;
}
