import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

//Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Actions
import { GET_PLAYERS_ASYNC } from '../actions/saga/players'

//Components
import Player from './Player/Player'
import Round from './Round/Round'

class App extends Component
{
	state = {
		isGameOver: false
	}

	componentDidMount() {
		this.props.getPlayers()
	}

	componentDidUpdate() {
		const dataPlayers = this.props.playersReducer.data

		if (dataPlayers.length > 0) {
			if (dataPlayers[0].vida <= 0 || dataPlayers[1].vida <= 0) {
				this.setState({
					isGameOver: true
				})
			}
		}
	}

	render() {
		const { playersReducer, roundReducer } = this.props
		const { isGameOver } = this.state
		const dataPlayers = playersReducer.data
		const errorPlayers = playersReducer.error
		const { orcLife, humanLife, whosRound } = roundReducer
		let orcPlayer, humanPlayer
		let error = errorPlayers

		if (error)
			return (
				<Container>
					<Row className='justify-content-center'>{error}</Row>
				</Container>
			)

		if (dataPlayers.length > 0) {
			orcPlayer = dataPlayers[0].nome === 'orc' ? dataPlayers[0] : dataPlayers[1]
			humanPlayer = dataPlayers[0].nome === 'human' ? dataPlayers[0] : dataPlayers[1]
		}

		if (isGameOver) {
			return (
				'Jogo acabou pop-up'
			)
		}

		return (
			<Container>
				<Row>
					<Col xs='5' md='5' lg='5'><Player {...humanPlayer} valueLife={humanLife || (humanPlayer && humanPlayer.vida)} isYourRound={whosRound === 'human'}/></Col>
					<Col xs='2' md='2' lg='2'><Round /></Col>
					<Col xs='5' md='5' lg='5'><Player {...orcPlayer} valueLife={orcLife || (orcPlayer && orcPlayer.vida)} isYourRound={whosRound === 'orc'} /></Col>
				</Row>
			</Container>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	getPlayers: _=> dispatch({ type: GET_PLAYERS_ASYNC }),
})

const mapStateToProps = ({ playersReducer, roundReducer }) => ({	
	playersReducer,
	roundReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App)