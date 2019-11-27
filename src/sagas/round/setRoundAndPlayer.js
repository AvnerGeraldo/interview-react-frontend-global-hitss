import { takeLatest, put, call } from 'redux-saga/effects'

//Actions
import { SET_ROUND_AND_PLAYER, FAIL_SET_ROUND_AND_PLAYER } from '../../actions/round'
import { SET_ROUND_AND_PLAYER_ASYNC } from '../../actions/saga/round'

function* setRoundAndPlayer({ payload: { initialPlayer, gameId }}) {
	try {
		if (gameId) {
			const res = yield call(fetch, 'http://localhost:8000/v1/turnos', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new FormData({
					'id_jogador_inicial': initialPlayer,
					'id_jogo': gameId
				})
			})

			if (res.status !== 200)
				throw new Error(res.statusText)

			//SET ROUND/PLAYER into reducer
			yield put({
				type: SET_ROUND_AND_PLAYER,
				payload: {
					initialPlayer, 
					gameId
				}
			})

			return
		}

		const res = yield call(fetch, 'http://localhost:8000/v1/turnos', {
			method: 'POST',
			body: JSON.stringify({
				'id_jogador_inicial': initialPlayer
			})
		})

		if (res.status !== 200)
			throw new Error(res.statusText)

		const id = yield res.json()

		//SET ROUND/PLAYER into reducer
		yield put({
			type: SET_ROUND_AND_PLAYER,
			payload: {
				initialPlayer, 
				gameId: id
			}
		})

		return
	} catch(e) {
		yield put({
			type: FAIL_SET_ROUND_AND_PLAYER,
			payload: {
				error: e.message
			}
		})
	}
}

export default function* () {
	yield takeLatest(SET_ROUND_AND_PLAYER_ASYNC, setRoundAndPlayer)
}