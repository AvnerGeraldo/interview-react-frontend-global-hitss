import { all } from 'redux-saga/effects'

//Watch
import watchPlayers from './players'
import watchGetRound from './round/getRoundData'
import watchSetRound from './round/setRound'
import watchThrowDamage from './round/throwDamage'


export default function* () {
	yield all([
		watchPlayers(),
		watchGetRound(),
		watchSetRound(),
		watchThrowDamage()
	])
}