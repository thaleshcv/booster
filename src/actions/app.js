import { useRef } from 'react';
import { actions } from '../reducer';

export default function useApp(dispatch) {
	const ref = useRef({
		resetData: function() {
			dispatch({
				type: actions.RESET_DATA
			});
		}
	});

	return ref.current;
}
