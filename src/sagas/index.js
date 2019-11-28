import { all } from 'redux-saga/effects'

//Watch
import watchPlayers from './players'
import watchGetRound from './round/getRoundData'
import watchSetRound from './round/setRound'


export default function* () {
	yield all([
		watchPlayers(),
		watchGetRound(),
		watchSetRound(),
	])
}