import { SET_DICE_PLAYER, SET_DRAW_PLAYER, SET_ROUND_AND_PLAYER, SET_TURN_PLAYER, FAIL_SET_ROUND_AND_PLAYER } from '../actions/round'

const initialState = {
	round: 0,
	gameId: 0,
	initialPlayer: 0,
	diceHumanPlayer: 0,
	diceOrcPlayer: 0,
	isHumanPlayed: false,
	isOrcPlayed: false,
	isRoundDamage: '',
	error: ''
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
		case SET_DRAW_PLAYER:
			return {
				...state,
				diceHumanPlayer: 0,
				diceOrcPlayer: 0,
				isHumanPlayed: false,
				isOrcPlayed: false,
				error: ''
			}
		case SET_ROUND_AND_PLAYER:
			const { initialPlayer, gameId } = payload
			const round = state.round + 1

			return {
				...state,
				round,
				gameId,
				initialPlayer
			}
		case FAIL_SET_ROUND_AND_PLAYER:
			const { error } = payload
			return {
				...state,
				isHumanPlayed: false,
				isOrcPlayed: false,
				error
			}
		case SET_TURN_PLAYER:
			let played = {
				isHumanPlayed: true
			}


			if (payload.player === 'orc')
				played = {
					isOrcPlayed: true
				}

			return {
				...state,
				...played
			}
		default:
			return state
	}
}