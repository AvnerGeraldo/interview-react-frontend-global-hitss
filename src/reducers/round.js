import { GET_ROUND_DATA, SET_WHOS_ROUND, CLEAN_WHOS_ROUND, FAIL_REQUEST } from '../actions/round'

const initialState = {
	round: 0,
	gameId: 0,
	initialPlayer: 0,
	orcId: 0,
	orcLife: 0,
	humanId: 0,
	humanLife: 0,
	error: '',
	whosRound: ''
}

export default (state = initialState, { type, payload }) => {
	switch(type) {
		case GET_ROUND_DATA:
			const { data } = payload
			return {
				...state,
				round: data.turno,
				gameId: data.id,
				initialPlayer: data.jogador_iniciante,
				orcId: data.id_personagem_orc,
				orcLife: data.vida_orc,
				humanId: data.id_personagem_humano,
				humanLife: data.vida_humano
			}
		case SET_WHOS_ROUND:
			const { player } = payload
			return {
				...state,
				whosRound: player
			}
		case CLEAN_WHOS_ROUND:
			return {
				...state,
				whosRound: ''
			}
		case FAIL_REQUEST:
			const { error } = payload
			return {
				...state,
				error
			}
		default:
			return state
	}
}