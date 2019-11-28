import { takeLatest, call, put } from 'redux-saga/effects'

//Actions
import { FAIL_REQUEST } from '../../actions/round'
import { SET_ROUND_ASYNC, GET_ROUND_DATA_ASYNC } from '../../actions/saga/round'

function* setRound({ payload: { idPlayer, gameId } }) {
	try {
		let gameIdReceive = gameId

		if (!gameId) {
			const res = yield call(fetch, 'http://localhost:8000/v1/turnos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: JSON.stringify({
					'id_jogador_inicial': idPlayer
				})
			})

			gameIdReceive = yield res.json()
			if (!gameIdReceive)
				throw new Error('Ocorreu um erro ao tentar receber o id do jogo.')
		} else {
			const res = yield call(fetch, 'http://localhost:8000/v1/turnos', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: JSON.stringify({
					'id_jogador_inicial': idPlayer,
					'id_jogo': gameIdReceive
				})
			})

			if (res.status !== 200)
				throw new Error(res.statusText)
		}
		
		
		yield put({
			type: GET_ROUND_DATA_ASYNC,
			payload: {
				gameId: gameIdReceive
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
	yield takeLatest(SET_ROUND_ASYNC, setRound)
}