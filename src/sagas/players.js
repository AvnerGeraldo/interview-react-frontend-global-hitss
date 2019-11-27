import { takeLatest, call, put } from 'redux-saga/effects'

//Actions
import { GET_PLAYERS, FAIL_GET_PLAYERS } from '../actions/players'
import { GET_PLAYERS_ASYNC } from '../actions/saga/players'

function* getPlayers() {
	try {
		const res = yield call(fetch, 'http://localhost:8000/v1/personagens')
		const data = yield res.json()

		yield put({
			type: GET_PLAYERS,
			payload: {
				data
			}
		})
	} catch(e) {
		yield put({
			type: FAIL_GET_PLAYERS,
			payload: {
				error: e.message
			}
		})
	}
}

export default function* () {
	yield takeLatest(GET_PLAYERS_ASYNC, getPlayers)
}