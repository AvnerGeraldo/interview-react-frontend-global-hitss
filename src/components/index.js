import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

//Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Actions
import { GET_PLAYERS_ASYNC } from '../actions/saga/players'

//Components
import Player from './Player/Player'

class App extends Component {

	componentDidMount() {
		this.props.getPlayers()
	}

	render() {
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

		return (
			<Container>
				<Row>
					<Col xs='5' md='5' lg='5'><Player {...humanPlayer} isYourRound={true}/></Col>
					<Col xs='2' md='2' lg='2'>Mensagens</Col>
					<Col xs='5' md='5' lg='5'><Player {...orcPlayer} /></Col>
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