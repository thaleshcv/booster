import { useRef } from 'react';
import { actions } from '../reducer';

export default function useFlash(dispatch) {
	const ref = useRef({
		addFlashMessage: function(msg) {
			dispatch({
				type: actions.ADD_FLASH_MESSAGE,
				payload: msg
			});
		},

		shiftFlashMessage: function() {
			dispatch({
				type: actions.SHIFT_FLASH_MESSAGE
			});
		}
	});

	return ref.current;
}
