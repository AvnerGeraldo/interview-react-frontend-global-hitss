import { takeLatest, call, put } from 'redux-saga/effects'

//Actions
import { GET_ROUND_DATA, FAIL_REQUEST } from '../../actions/round'
import { GET_ROUND_DATA_ASYNC } from '../../actions/saga/round'

function* getData({ payload: { gameId } }) {
	try {
		if (!gameId)
			throw new Error('Informe o \'ID\' do jogo para buscá-lo')

		const res = yield call(fetch, `http://localhost:8000/v1/turnos/${gameId}`)
		const data = yield res.json()

		yield put ({
			type: GET_ROUND_DATA,
			payload: {
				data
			}
		})
	} catch(e) {
		yield put({
			type: FAIL_REQUEST,
			payload: {
				error: e.message
			}
		})
	}
}

export default function* () {
	yield takeLatest(GET_ROUND_DATA_ASYNC, getData)
}