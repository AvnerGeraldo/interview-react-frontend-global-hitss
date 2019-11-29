import { takeLatest, call, put } from 'redux-saga/effects'

//Actions
import { FAIL_REQUEST } from '../../actions/round'
import { THROW_DAMAGE_ASYNC, GET_ROUND_DATA_ASYNC } from '../../actions/saga/round'

function* throwDamage({ payload: { idDamagePlayer, gameId, damage } }) {
	try {
		const res = yield call(fetch, 'http://localhost:8000/v1/batalhas', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: JSON.stringify({
				'id_personagem_dano': idDamagePlayer,
				'id_jogo': gameId,
				'dano': damage
			})
		})

		//Check if ok
		if (res.status !== 200)
			throw new Error(res.statusText)
		
		//Update round data		
		yield put({
			type: GET_ROUND_DATA_ASYNC,
			payload: {
				gameId: gameId
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
	yield takeLatest(THROW_DAMAGE_ASYNC, throwDamage)
}