import { SET_DICE_PLAYER, SET_ROUND_AND_PLAYER, SET_TURN_PLAYER } from '../actions/round'

const initialState = {
	round: 0,
	initialPlayer: 0,
	diceHumanPlayer: 0,
	diceOrcPlayer: 0,
	humanPlayed: false,
	orcPlayed: false
}

export default (state = initialState, { type, payload }) => {
	switch(type) {
		case SET_DICE_PLAYER:
			const { player, valueDice } = payload
			let dicePlayer = {
				diceHumanPlayer: valueDice
			}


			if (player === 'orc')
				dicePlayer = {
					diceOrcPlayer: valueDice
				}

			return {
				...state,
				...dicePlayer
			}
		case SET_ROUND_AND_PLAYER:
			const { initialPlayer } = payload
			const round = state.round + 1

			return {
				...state,
				round,
				initialPlayer
			}
		case SET_TURN_PLAYER:
			const { player } = payload
			let played = {
				humanPlayed: true
			}


			if (player === 'orc')
				played = {
					orcPlayed: true
				}

			return {
				...state,
				...played
			}
		default:
			return state
	}
}