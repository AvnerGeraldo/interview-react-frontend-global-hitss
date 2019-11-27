import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form } from'react-bootstrap'
import styled from 'styled-components'

//Images
import Dice20Faces from '../../assets/images/dice-20-faces.png'

//Actions
import { SET_DICE_PLAYER_ASYNC, SET_DRAW_PLAYER_ASYNC, SET_ROUND_AND_PLAYER_ASYNC, SET_TURN_PLAYER_ASYNC } from '../../actions/saga/round'

//Styled Components
const Img = styled.img`
	width: 50px;
	margin: 10px 0;
`

const ContentCenterRow = styled.div`
	.row {
		justify-content: center!important;
	}

	.row:first-child {
		margin-bottom: 15px;
	}

	.dice {
		cursor: pointer;
	}

	input.form-control, textarea.form-control {
		text-align: center;
	}
`

class Round extends PureComponent
{
	state = {
		messageRound: '',
		valueDice: 0,
		isStartedGame: false,
		isStartedRound: false,
		dataOrc: [],
		dataHuman: [],
		player: '',
	}

	firstStep = _ => {
		const { isStartedRound } = this.state
		const { initialPlayer, isHumanPlayed, isOrcPlayed } = this.props

		if (!isStartedRound) {
			if (initialPlayer === 0) {
				if (isHumanPlayed && !isOrcPlayed) {
					this.setState({
						player: 'orc',
						messageRound: 'Início de jogo!\nJogador \'Orc\' rode o dado!',
						valueDice: 0
					})
				}

				if (!isHumanPlayed && isOrcPlayed) {
					this.setState({
						player: 'human',
						messageRound: 'Início de jogo!\nJogador \'Human\' rode o dado!',
						valueDice: 0
					})
				}

				if (isHumanPlayed && isOrcPlayed) {
					this.checkHighestValue()
				}
			}
		} else {
			this.secondStep()
		}
	}

	checkHighestValue = _ => {
		const { dispatch, diceHumanPlayer, diceOrcPlayer, initialPlayer, gameId } = this.props
		const { dataOrc, dataHuman } = this.state

		//Check if draw
		if ((diceHumanPlayer + dataHuman.agilidade) === (diceOrcPlayer + dataOrc.agilidade)) {
			dispatch({
				type: SET_DRAW_PLAYER_ASYNC
			})

			let player = dataHuman.nome
			if (initialPlayer > 0) {
				player = initialPlayer === dataHuman.id ? dataHuman.nome : dataOrc.nome
			}

			this.setState({
				player: player,
				messageRound: `Deu empate!\nJogador\'${player}\' jogue novamente os dados!`,
			})

			return
		}

		//Check if highest
		const starterPlayer = (diceHumanPlayer + dataHuman.agilidade) > (diceOrcPlayer + dataOrc.agilidade) ? dataHuman : dataOrc
		
		dispatch({
			type: SET_ROUND_AND_PLAYER_ASYNC,
			payload: {
				initialPlayer: starterPlayer.id,
				gameId
			}
		})

		//Set begining of round
		this.setState({
			isStartedRound: true,
			valueDice: 0,
			messageRound: '',
			player: ''
		})

		//Call second step
		this.secondStep()
	}

	secondStep = _ => {
		const { isStartedRound, player, dataOrc, dataHuman } = this.state
		const { initialPlayer, isHumanPlayed, isOrcPlayed, diceHumanPlayer, diceOrcPlayer } = this.props

		if (isStartedRound) {
			//Check if played(initialPlayer)
			const whoInitialPlayer = initialPlayer === dataHuman.id ? dataHuman.nome : dataOrc.nome

			if (whoInitialPlayer === 'human') {
				this.actionStep(dataHuman, dataOrc, isHumanPlayed, isOrcPlayed, diceHumanPlayer, diceOrcPlayer)
			} else {
				this.actionStep(dataOrc, dataHuman, isOrcPlayed, isHumanPlayed, diceOrcPlayer, diceHumanPlayer)
			}
		}
	}

	actionStep = (atkPlayer, defPlayer, firstPlayed, secondPlayed, atkDice, defDice) => {
		if (firstPlayed && !secondPlayed) {
			this.setState({
				player: defPlayer.nome,
				messageRound: `Jogador \'${defPlayer.nome}\' rode os dados para se defender!`,
				valueDice: 0
			})
		}

		if (!firstPlayed && !secondPlayed) {
			this.setState({
				player: atkPlayer.nome,
				messageRound: `Jogador \'${atkPlayer.nome}\' rode os dados para atacar!`,
				valueDice: 0
			})
		}

		if (firstPlayed && secondPlayed) {
			const atk = atkDice + atkPlayer.arma.forca + atkPlayer.agilidade
			const def = defDice + defPlayer.arma.defesa + defPlayer.agilidade

			if (atk === def) {
				this.setState({
					player: defPlayer.nome
				})

				this.secondStep()
				return 
			}

			if (atk > def) {
				this.setState({
					messageRound: `Jogador \'${atkPlayer.nome}\' rode o seu dado para calcular o ataque!`,
					valueDice: 0
				})

				dispatch({
					type: SET_ROUND_DAMAGE,
					payload: {
						player: atkPlayer.nome
					}
				})
			}
		}
		
	}

	//Jogar na saga
	throwDamage = (valueDice, atkPlayer, defPlayer) => {
		const damage = valueDice + atkPlayer.arma.forca
		dispatch({
			type: SET_DAMAGE_ON_DEFENDER,
			payload: {
				id: defPlayer.id,
				damage
			}
		})
	}


	componentDidUpdate() {
		const { isStartedGame } = this.state
		const { dataPlayers } = this.props

		if (!isStartedGame && dataPlayers.length > 0) {
			this.setState({
				isStartedGame: true,
				messageRound: 'Início de jogo!\nJogador \'Humano\' rode o dado!',
				player: 'human',
				idOrc: dataPlayers[0].nome === 'orc' ? dataPlayers[0] : dataPlayers[1],
				idHuman: dataPlayers[0].nome === 'human' ? dataPlayers[0] : dataPlayers[1]
			})
		}
	}

	throwDices = _ => {	
		const { isStartedGame, player } = this.state
		const { dispatch, isRoundDamage } = this.props

		if (isStartedGame && isRoundDamage.length === 0) {
			const min = Math.ceil(1);
			const max = Math.floor(20);
			const valueDice = Math.floor(Math.random() * (max - min + 1)) + min

			//Set value of dice
			this.setState({ 
				valueDice 
			})

			//Set Dice Player
			dispatch({
				type: SET_DICE_PLAYER_ASYNC,
				payload: {
					player,
					valueDice
				}
			})
			
			//Call start round
			this.firstStep()
		}
	}

	render() {
		const { messageRound, valueDice } = this.state
		const { round } = this.props

		return (
			<ContentCenterRow>
				<Row>
					<Col xs='12' md='8' lg='6'>
						<Form.Control 
							type='text'
							ref='txtRound'
							value={round > 0 ? round : ''}
							readOnly />
					</Col>
				</Row>
				<Row>
					<Form.Control 
						as="textarea" 
						rows="3"
						value={messageRound}
						ref='txtMessageRound'
						readOnly 
						style={{ resize: 'none' }}/>
				</Row>
				<Row>
					<Img src={Dice20Faces} alt='Dice 20 faces' onClick={this.throwDices} className='dice'/>
				</Row>
				<Row>
					<Col md='8' lg='6'>
						<Form.Control 
							type='text'
							ref='txtDice'
							value={valueDice > 0 ? valueDice : ''}
							readOnly
						/>
					</Col>
				</Row>
			</ContentCenterRow>
		)
	}
}

const mapStateToProps = ({ roundReducer, playersReducer }) => ({
	...roundReducer,
	dataPlayers: playersReducer.data
})

export default connect(mapStateToProps)(Round)