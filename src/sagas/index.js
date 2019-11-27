import { all } from 'redux-saga/effects'

//Watch
import watchPlayers from './players'
import watchSetDicePlayers from './round/setDicePlayer'
import watchSetRoundAndPlayer from './round/setRoundAndPlayer'
import watchSetTurnPlayer from './round/setTurnPlayer'

export default function* () {
	yield all([
		watchPlayers(),
		watchSetDicePlayers(),
		watchSetRoundAndPlayer(),
		watchSetTurnPlayer()
	])
}