import { takeLatest, put } from 'redux-saga/effects'

//Actions
import { SET_DICE_PLAYER } from '../../actions/round'
import { SET_DICE_PLAYER_ASYNC } from '../../actions/saga/round'

function* setDicePlayer({ payload: { player, valueDice } }) {
	yield put({
		type: SET_DICE_PLAYER,
		payload: {
			player,
			valueDice
		}
	})
}

export default function* () {
	yield takeLatest(SET_DICE_PLAYER_ASYNC, setDicePlayer)
}