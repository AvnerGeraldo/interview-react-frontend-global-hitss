import { takeLatest, put } from 'redux-saga/effects'

//Actions
import { SET_DRAW_PLAYER } from '../../actions/round'
import { SET_DRAW_PLAYER_ASYNC } from '../../actions/saga/round'

function* setDrawPlayer() {
	yield put({ type: SET_DRAW_PLAYER })
}

export default function* () {
	yield takeLatest(SET_DRAW_PLAYER_ASYNC, setDrawPlayer)
}