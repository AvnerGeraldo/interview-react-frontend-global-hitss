//Actions
import { GET_PLAYERS, FAIL_GET_PLAYERS } from '../actions/players'

const initialState = {
	data: {},
	error: ''
}

export default (state = initialState, { type, payload }) => {
	switch(type) {
		case GET_PLAYERS:
			const { data } = payload

			return {
				...state,
				data,
				error: ''
			}
		case FAIL_GET_PLAYERS:
			const { error } = payload

			return {
				data: {},
				error
			}

		default:
			return state
	}
}