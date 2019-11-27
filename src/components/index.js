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

	componentDidUpdate(prevProps) {
		const dataPlayers = this.props.playersReducer.data

		if (dataPlayers.length > 0) {
			if (dataPlayers[0].vida <= 0 || dataPlayers[1].vida <= 0) {
				this.setState({
					isGameOver: true
				})

				dispatch({
					type: RESET_ROUND_ASYNC
				})
			}
		}
	}

	render() {
		const { isGameOver } = this.state
		const dataPlayers = this.props.playersReducer.data
		const error = this.props.playersReducer.error
		let orcPlayer, humanPlayer

		if (error)
			return (
				<Container>
					<Row className='justify-content-center'>{error}</Row>
				</Container>
			)

		if (dataPlayers.length > 0) {
			for(let p = 0; p < dataPlayers.length; p++) {
				if (dataPlayers[p].nome === 'orc') {
					orcPlayer = dataPlayers[p]
				} else {
					humanPlayer = dataPlayers[p]
				}
			}
		}

		if (isGameOver) {
			return (
				'Jogo acabou pop-up'
			)
		}

		return (
			<Container>
				<Row>
					<Col xs='5' md='5' lg='5'><Player {...humanPlayer} valueLife={3} isYourRound={true}/></Col>
					<Col xs='2' md='2' lg='2'><Round /></Col>
					<Col xs='5' md='5' lg='5'><Player {...orcPlayer} valueLife={10} /></Col>
				</Row>
			</Container>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	getPlayers: _=> dispatch({ type: GET_PLAYERS_ASYNC }),
})

const mapStateToProps = ({ playersReducer }) => ({	
	playersReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App)