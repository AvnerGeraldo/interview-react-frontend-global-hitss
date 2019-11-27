import { takeLatest, put } from 'redux-saga/effects'

//Actions
import { SET_TURN_PLAYER } from '../../actions/round'
import { SET_TURN_PLAYER_ASYNC } from '../../actions/saga/round'

function* setTurnPlayer({ payload: { player } }) {
	yield put({
		type: SET_TURN_PLAYER,
		payload: {
			player
		}
	})
}

export default function* () {
	yield takeLatest(SET_TURN_PLAYER_ASYNC, setTurnPlayer)
}